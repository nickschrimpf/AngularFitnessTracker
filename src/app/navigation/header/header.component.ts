import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>()
  loggedIn:boolean = false
  authSub:Subscription

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authSub = this.authService.authChange.subscribe(isAuth =>{
      this.loggedIn = isAuth
    })
  }
  ngOnDestroy(){
    if(this.authSub){
      this.authSub.unsubscribe()
    }
  }

  onToggleSidenav(){
    this.sidenavToggle.emit()
  }

  onLogOut(){
    this.authService.logOut()
  }

}
