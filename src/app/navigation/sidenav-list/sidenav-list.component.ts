import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() onCloseSidenav = new EventEmitter<void>()
  loggedIn:boolean = false;
  authSub:Subscription;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authSub = this.authService.authChange.subscribe( isAuth => {
      this.loggedIn = isAuth
    })
  }

  ngOnDestroy(){
    if(this.authSub){
      this.authSub.unsubscribe()
    }
  }

  onClose(){
    this.onCloseSidenav.emit()
  }
  onLogOut(){
    this.onClose()
    this.authService.logOut()
  }

}
