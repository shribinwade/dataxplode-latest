import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, catchError, Observable, of, Subject, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.authUrl+'/user';
  subscriptionURL = environment.subscriptionUrl;

  userStatus: Subject<String> = new Subject();

  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();
  

  

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private jwt: JwtHelperService
  ) {}

  getUserSearchData(data: any) {
    debugger;
    //extract form data parameter

    const UserID = data.UserID as number;
    const country = data.country as string;
    const platform = data.platform as string;
    //use the URL and form data parameter as the cache key
    this.httpClient.get(`${this.subscriptionURL}/getUserSearchData?UserID=${UserID}&country=${country}&platform=${platform}`).subscribe((response)=> {
      this.dataSubject.next(response);
    });
  }

  signup(data: any) {
    return this.httpClient.post(this.url + '/signup', data, {
      headers: new HttpHeaders().set('content-Type', 'application/json'),
    });
  }

  forgotPassword(data: any) {
    return this.httpClient.post(this.url + '/forgotPassword', data, {
      headers: new HttpHeaders().set('content-Type', 'application/json'),
    });
  }

  login(data: any) {
    return this.httpClient.post(this.url + '/login', data, {
      headers: new HttpHeaders().set('content-Type', 'application/json'),
    });
  }

  update(data: any) {
    return this.httpClient.post(this.url + '/update', data, {
      headers: new HttpHeaders().set('content-Type', 'application/json'),
    });
  }

  changePassword(data: any) {
    return this.httpClient.post(this.url + '/changePassword', data, {
      headers: new HttpHeaders().set('content-Type', 'application/json'),
    });
  }

  checkToken() {
    return this.httpClient.get(this.url + '/checkToken');
  }

  resetPssword(data: any) {
    return this.httpClient.post(this.url + '/resetPassword', data, {
      headers: new HttpHeaders().set('content-Type', 'application/json'),
    });
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['home']);
      return false;
    } else {
      return true;
    }
  }

  public isLoggedIn(): boolean {
    // Check if the token exists in localStorage or sessionStorage and if it is not expired
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');

    if (token !== null && !this.jwt.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  public getUserInfo(): User | null {
    if (!this.isLoggedIn) {
      return null;
    } else {
      // Retrieve the token from localStorage or sessionStorage
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');

      if (token) {
        let decodedToken = this.jwt.decodeToken(token); // Pass the token to decode

        let user: User = {
          id: decodedToken.id,
          email: decodedToken.email,
          role: decodedToken.role,
          contactNumber: decodedToken.contactNumber,
          name: decodedToken.name,
          status: decodedToken.status,
        };
        return user;
      } else {
        return null; // If no token is found
      }
    }
  }

  public getDBData(dbEndpointUrl: string): Observable<any | null> {
    debugger
    return this.httpClient.get(dbEndpointUrl).pipe(
      tap((response) => {
        response;
      }),
      catchError((error) => {
        console.error('Error fetching data from DB:', error);
        return of(null); // Return null in case of an error
      })
    );
  }
}
