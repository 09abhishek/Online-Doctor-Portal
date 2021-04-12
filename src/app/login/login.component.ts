import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public loginService: LoginService,
    private router: Router) {
  }

  showErrorMsg = false;

  ngOnInit() {
  }

  form = new FormGroup({
    // "name" : new FormControl("", Validators.required)

  })

  onLogin(form: NgForm) {
    this.showErrorMsg = false;
    if (form.valid) {
      this.loginService.login(form.value.email, form.value.password)
        .subscribe((data) => {
          if (data['status']) {
            localStorage.setItem('doctor_id', data['result'].user_id);
            localStorage.setItem('doctor_name', data['result'].name);
            localStorage.setItem('isDoctorLoggedIn', 'true');
            this.loginService.setToken(true);
            this.router.navigateByUrl('/doctorDashboard');

          } else {
            this.showErrorMsg = true;
          }
        });
    } else {
      return;
    }
  }

}
