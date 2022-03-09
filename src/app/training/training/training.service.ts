import { Injectable } from '@angular/core';
import { Exercise } from '../exercise.model';
import { Observable, Subscription }from 'rxjs';
import { map } from 'rxjs/operators';
import { UiService } from '../../assets/ui-service.service';

import { AngularFirestore  } from '@angular/fire/compat/firestore';
// import { TimeStamp  } from '@angular/fire/compat/firestore'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TrainingService {
  private runningExercise: Exercise;
  private availableExercises: Exercise[]
  exercisesChanged = new Subject<Exercise[]>()
  exerciseChanged = new Subject<Exercise>()
  pastExercisesChanged = new Subject<Exercise[]>()
  fbSubs:Subscription[] = []
 


 
  

  constructor(private db:AngularFirestore,private uiService:UiService) { }

  startExercise(selectedId:string){
    this.db.doc('availableExercises/'+ selectedId).update({lastSelected:new Date()})
    this.runningExercise = this.availableExercises.find(exercise => exercise.id === selectedId )
    this.exerciseChanged.next({...this.runningExercise})
    
  }

  onfetchExercises(){
    
   this.fbSubs.push(this.db.collection('availableExercises')
       .snapshotChanges()
       .pipe(map(docArray => {
           return docArray.map(doc => {
             return {
               id:doc.payload.doc.id,
               name:doc.payload.doc.data()['name'],
               duration:doc.payload.doc.data()['duration'],
               calories:doc.payload.doc.data()['calories']
             }
         })
       })
      )
       .subscribe((exercises:Exercise[]) => {
         console.log(exercises)
         this.availableExercises = exercises
         this.exercisesChanged.next([...exercises])
       })
      )
  }
  getRunningExercise(){
    return { ...this.runningExercise }
  }
  completeExercise(){
    this.addDatatoDataBase({...this.runningExercise,date:new Date(),state:'completed'})
    this.runningExercise = null
    this.exerciseChanged.next(null)
  }
  cancelExercise(progress:number){
   
    this.addDatatoDataBase({
      ...this.runningExercise,
      duration:this.runningExercise.duration * (progress/100),
      calories:this.runningExercise.calories * (progress/100),
      date:new Date(),
      state:'cancelled'
    })

    this.runningExercise = null
    this.exerciseChanged.next(null)

  }

  cancelSubs(){
    this.fbSubs.forEach(sub => sub.unsubscribe())
  }

  getPastExercisesFromDB(){
 
  this.fbSubs.push(this.db.collection('pastExercises').snapshotChanges()
    .pipe(map(docArray => {
           return docArray.map(doc => {
             return {
               id:doc.payload.doc.id,
               name:doc.payload.doc.data()['name'],
               duration:doc.payload.doc.data()['duration'],
               calories:doc.payload.doc.data()['calories'],
               date:doc.payload.doc.data()['date'],
               state:doc.payload.doc.data()['state']
             }
         })
       })
      ).subscribe(data=>{
       
        this.pastExercisesChanged.next(data)
      }, error => {
        this.uiService.showSnackBar('fetching exercises failed, please try again later',undefined,3000)
      }))
}
 
  addDatatoDataBase(exercise:Exercise){
    this.db.collection('pastExercises').add(exercise)
  }
}
