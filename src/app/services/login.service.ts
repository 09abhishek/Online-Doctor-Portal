import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiURL} from '../config/common-url';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn : 'root'
})
export class LoginService {
  private authStatusListener = new Subject<boolean>();
  private tokenTimer : any;

  constructor(private router: Router,private http: HttpClient) {
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  setToken(booleanValue: boolean) {
    this.authStatusListener.next(booleanValue);
  }

  login(email: string, pwd: string) {
    return this.http.post(apiURL+'login',{email : email, password: pwd});
  }

  logout() {
    localStorage.removeItem('isDoctorLoggedIn');
    this.router.navigateByUrl('/portal');
    this.authStatusListener.next(false);
  }

  isloggedIn() {
    return !!localStorage.getItem('isDoctorLoggedIn');
  }

}
