import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from 'src/globals/endpoints';
import { User } from '../models/user.model';
import { UserCredentials } from '../utils/user-credentials.util';
import { map } from 'rxjs/operators';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  getCurrentUser(): User {
    if (!!localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser'));
    } else return undefined;
  }

  getCurrentUserRole(): Role {
    if (!!localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser')).role;
    } else return undefined;
  }

  loginUser(userCredentials: UserCredentials): Observable<User> {
    return this.httpClient
      .post<User>(
        ENDPOINTS.baseUrl + '/' + ENDPOINTS.authenticateUser,
        userCredentials
      )
      .pipe(
        map((user) => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        })
      );
  }

  logoutUser() {
    localStorage.removeItem('currentUser');
  }
}
