import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn = false;

  constructor(private router: Router,
    private loginService: LoginService) { }

  private authListenerSubscription : Subscription;
  userIsAuthenticated: boolean = false;

  ngOnInit() {
    this.userIsAuthenticated = this.loginService.isloggedIn();
    this.authListenerSubscription = this.loginService.getAuthStatusListener().subscribe(isAuthtenticated => {
      this.userIsAuthenticated = isAuthtenticated;
    });
  }

  moveToPortal() {
    this.router.navigateByUrl('/portal');
  }

  logout() {
    this.loginService.logout();
  }

}
