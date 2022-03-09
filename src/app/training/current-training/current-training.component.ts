import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TrainingService } from '../training/training.service';
import { Exercise } from '../exercise.model'

import {StopTrainingComponent } from './stop-training/stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {



  progress = 0
  timer:number



  constructor(private dialog:MatDialog, private trainingService:TrainingService) { }


  ngOnInit(): void {
    this.resumeTimer()
   }

   resumeTimer(){
      const step  = this.trainingService.getRunningExercise().duration / 100 * 1000
      this.timer = setInterval( ()=> {
        this.progress = this.progress + 1
        if(this.progress >= 100){
          this.trainingService.completeExercise()
          clearInterval(this.timer)
        }
      },step)
   }


   onStopTimer(){
     clearInterval(this.timer)

    const dialogRef = this.dialog.open(StopTrainingComponent,{
       
       data:{
         progress:this.progress
       }
     })
    dialogRef.afterClosed().subscribe(data =>{
      if(data){

        this.trainingService.cancelExercise(this.progress)
        
        
      }else{
        this.dialog.closeAll()
        this.resumeTimer()
        
      }
      
    })
   }


}
