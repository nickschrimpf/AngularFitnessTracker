import { Component, OnInit, ViewChild, AfterViewInit , OnDestroy } from '@angular/core';

import { TrainingService } from '../training/training.service';

import { Exercise } from '../exercise.model';

import { Subscription } from 'rxjs'

import {  MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  pastExercisesSub:Subscription
  displayedColumns = ['name','date','duration','calories','state']

  // MatTableDataSource expects an array of whatever you pass it
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild( MatSort ) sort : MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  constructor(private trainingService:TrainingService) { }

  ngOnInit(): void {
  this.trainingService.getPastExercisesFromDB()
  this.pastExercisesSub = this.trainingService.pastExercisesChanged.subscribe(data => this.dataSource.data = data)
  
  }
  // After the view loads life cycle hook!
  ngAfterViewInit(){

    this.dataSource.paginator = this.paginator;
    
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(){
    if(this.pastExercisesSub){
      this.pastExercisesSub.unsubscribe()
    }
  }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
