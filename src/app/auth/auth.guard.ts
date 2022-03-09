import {CanActivate , ActivatedRouteSnapshot, RouterStateSnapshot , Router, UrlTree } from '@angular/router';
import { Observable }from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private authService:AuthService,private router:Router){}

	canActivate(route: ActivatedRouteSnapshot,state:RouterStateSnapshot){

		if(this.authService.isAuth()){
			return true
		}else {
			return this.router.navigate(['/login'])
			
			
		}
	}

}