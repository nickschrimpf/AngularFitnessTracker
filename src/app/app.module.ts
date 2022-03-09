import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AuthService } from './auth/auth.service';
import { UiService} from './assets/ui-service.service';
import { TrainingService } from './training/training/training.service';


import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule }from '@angular/fire/compat';
import { environment } from '../environments/environment';

import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';


import { AuthModule } from './auth/auth.module';
import { TrainingModule } from './training/training.module';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { SharedModule } from './assets/sharedModule'


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
   

  ],
  imports: [
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TrainingModule,
    SharedModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
   
    
  ],
  providers: [AuthService,TrainingService,UiService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
