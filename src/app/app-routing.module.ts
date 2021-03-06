import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training/training.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingComponent } from './training/past-training/past-training.component';
import { WelcomeComponent } from './welcome/welcome.component'
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path:'', component:WelcomeComponent},
  {path: 'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'training',component:TrainingComponent, canActivate:[AuthGuard]},
  {path:'**',component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
