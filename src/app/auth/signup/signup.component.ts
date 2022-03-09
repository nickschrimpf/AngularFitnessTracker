import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from '../auth.service';
import {UiService} from '../../assets/ui-service.service'
import {Subscription } from 'rxjs'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {
  maxDate:any;
  isLoading:boolean = false
  loadingSub:Subscription
  constructor(private authService:AuthService, private uiService:UiService) { }

  ngOnInit(): void {
    this.loadingSub = this.uiService.loadingStateChanged.subscribe(loadingState => {
      this.isLoading = loadingState
    })
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18)
  }
  ngOnDestroy(){
    this.loadingSub.unsubscribe()
  }

  onSubmit(form: NgForm){
    this.authService.registerUser({
      email:form.value.email,
      password: form.value.password
      
    })
  }

}
