import { Injectable } from '@angular/core';
import {Router } from '@angular/router';
import { User } from './user.model';
import { AuthData} from './auth-data.model';
import { getAuth, signOut } from "firebase/auth";

import { TrainingService } from '../training/training/training.service';

import { UiService} from '../assets/ui-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import {Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  authChange = new Subject<boolean>()
  isLoggedIn:boolean = false
  constructor(
    private router:Router,
    private auth:AngularFireAuth,
    private trainingService:TrainingService,
    private uiService:UiService) { }

  initAuthListener(){
    this.auth.authState.subscribe(user =>{
      if(user){
        this.isLoggedIn = true
        this.authChange.next(true)
        this.router.navigate(['/training'])
      }else{
        this.isLoggedIn = false
        this.authChange.next(false)
        this.router.navigate(['/login'])
      }
    })
  }

  registerUser(authData:AuthData){
   this.uiService.loadingStateChanged.next(true)
   this.auth.createUserWithEmailAndPassword(authData.email,authData.password).then(result => {
     console.log(result)
     this.uiService.loadingStateChanged.next(false)
   }).catch(error=>{
     this.uiService.showSnackBar(error.message,undefined,3000)
     this.uiService.loadingStateChanged.next(false)
     console.log(error)
   })
  }

  logIn(authData:AuthData){
    this.uiService.loadingStateChanged.next(true)
    this.auth.signInWithEmailAndPassword(authData.email,authData.password).then(result =>{
      console.log(result)
     this.uiService.loadingStateChanged.next(false)
    }).catch(error => {
      this.uiService.showSnackBar(error.message,undefined,3000)
      this.uiService.loadingStateChanged.next(false)
      console.log(error)
    })
   
   
    
  }



  logOut(){
    this.trainingService.cancelSubs()
   this.auth.signOut()
    this.isLoggedIn = false; 
    this.authChange.next(false)
    this.router.navigate(['/login'])
    
  }

 

  isAuth(){
    return this.isLoggedIn;
    
  }
  
}
