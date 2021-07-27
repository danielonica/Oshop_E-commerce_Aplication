import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { map } from 'rxjs/operators';
import { UserService } from 'shared/services/user.service';
import { Observable } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(private auth:AuthService,private userService: UserService) { }

  canActivate():any{

    return this.auth.appUser$.pipe(
      map((appUser: AppUser) => appUser.isAdmin));
    
    }


  }

