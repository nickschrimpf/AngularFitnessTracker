import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs'
import { AuthService } from '../auth.service';
import {UiService} from '../../assets/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  loadingSub:Subscription
  isLoading = false
  constructor(private authService:AuthService,private uiService:UiService) { }

  ngOnInit(): void {
    this.loadingSub = this.uiService.loadingStateChanged.subscribe(loadingState =>{
      this.isLoading = loadingState
    })
  }

  ngOnDestroy(){
    this.loadingSub.unsubscribe()
  }

   onSubmit(form: NgForm){
     this.authService.logIn({
      email:form.value.email,
      password: form.value.password
    })
  }

}
