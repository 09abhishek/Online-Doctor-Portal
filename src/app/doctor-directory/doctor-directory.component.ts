import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { apiServices } from '../services/api.services';

@Component({
  selector: 'app-doctor-directory',
  templateUrl: './doctor-directory.component.html',
  styleUrls: ['./doctor-directory.component.css']
})
export class DoctorDirectoryComponent implements OnInit {

  doctors = [];
  userType = 'user';
  // @ViewChild('searchText') searchText: ElementRef;

  constructor(private apiService: apiServices,
    private router: Router) {
  }

  ngOnInit() {
    console.log(this.userType);
    this.fetchAllDoctors();
  }

  fetchAllDoctors() {
    this.apiService.fetchAllDoctors().subscribe((res) => {
      this.doctors = res['result'];
    });
  }


  showDoctorDetails(doctor_name, doctor_id) {
    localStorage.setItem('appointment_doctor', doctor_name);
    this.router.navigateByUrl('/doctorInfo/' + doctor_id);
  }
}
