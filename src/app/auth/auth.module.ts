import { NgModule } from '@angular/core';
import {CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { MaterialModule } from '../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

import { SharedModule } from '../assets/sharedModule';



import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

@NgModule({
	declarations:[
		SignupComponent,
    	LoginComponent,
	],
	imports:[
		SharedModule,
		
	],
	exports:[]
})

export class AuthModule{}