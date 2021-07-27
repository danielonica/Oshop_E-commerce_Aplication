import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import  firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:Observable<firebase.User | null>;

  constructor(
    private db: AngularFireDatabase,
    private userService:UserService,
    private afAuth:AngularFireAuth,private route:ActivatedRoute) { 
    this.user$ = afAuth.authState;

  }

    login() {
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);

      this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    
    }
    logout(){
      this.afAuth.signOut();
    }


    get appUser$():any {

       return this.user$.pipe(
      switchMap(user => {
        if(user)
          return  this.db.object('/users/' + user.uid).valueChanges();
        else
          return of(null);
        }
      ))
      }

}

