import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../models/User';
import {BehaviorSubject} from 'rxjs';
import {Storage} from '@ionic/storage';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSource = new BehaviorSubject<IUser>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private storage: Storage) {
  }

  loginWithEmail(value: any) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
    ${environment.firebaseConfig.apiKey}`, value)
      .pipe(
        map((user: IUser) => {
          this.setUserToStorage(user);
        })
      );
  }

  register(values: any) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
    ${environment.firebaseConfig.apiKey}`, values)
      .pipe(
        map((user: IUser) => {
          this.setUserToStorage(user);
        })
      );
  }

  private setUserToStorage(user: IUser) {
    if (user) {
      this.storage.set('user', JSON.stringify(user));
      this.currentUserSource.next(user);
    }
  }
}
