import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


import { StopTrainingComponent } from './current-training/stop-training/stop-training.component';
import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { SharedModule } from '../assets/sharedModule'


@NgModule({
	declarations:[
		TrainingComponent,
		StopTrainingComponent,
		CurrentTrainingComponent,
		NewTrainingComponent,
		PastTrainingComponent,
		StopTrainingComponent
	],
	imports:[
		SharedModule
	],
	exports:[]
})

export class TrainingModule{}
