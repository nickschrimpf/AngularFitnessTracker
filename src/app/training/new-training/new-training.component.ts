import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms'
import { TrainingService } from '../training/training.service';
import { Exercise } from '../exercise.model';




import { Observable, Subscription }from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit ,OnDestroy {
  exerciseSub:Subscription;
  
  isLoading = true
  exercises: Exercise[];


  constructor(private trainingService:TrainingService) { }

  ngOnInit(): void {
    this.exerciseSub = this.trainingService.exercisesChanged.subscribe(exercise => {
      this.exercises = exercise
      this.isLoading = false
    })
     this.trainingService.onfetchExercises()

     
  }
  ngOnDestroy(){
    this.exerciseSub.unsubscribe()
  
  }

  onStartTraining(form:NgForm){
   this.trainingService.startExercise(form.value.exercise)
  }
}
