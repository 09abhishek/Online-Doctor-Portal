import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { apiServices } from '../services/api.services';
import * as moment from 'moment';


@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {

  doctorID: string;
  time: string;
  date: string;
  selectedTime = ""
  selectedDoctor =  localStorage.getItem('appointment_doctor');

  constructor(private apiService: apiServices,
    private router: Router,
    private route: ActivatedRoute) { }


    ngOnInit(): void {
      this.doctorID = this.route.snapshot.paramMap.get('id')
    }

  onSubmit(form: NgForm) {
    console.log(form.value);
    let uploadAppointment = {
      "appointment_date": this.date,
      "appointment_time": this.time,
      "doctor_id":  this.doctorID,
      "patient_name": form.value.name,
      "patient_email": form.value.email,
      "patient_phone" : form.value.number,
      "appointment_status": "Open"
       }
    if (form.valid) {
      this.apiService.addAppointment(uploadAppointment)
        .subscribe((data) => {
          if (data['status']) {
            alert(data['result']);
            this.moveToPortal();

            // form.resetForm();

          } else {
            alert(data['result']);
          }
        });
    } else {
      return;
    }
  }

  setDate(event) {
      this.date = moment(event.target.value).format('YYYY-MM-DD');
  }

  setTime() {
    this.time = moment(this.selectedTime).format('hh:mm:ss');
  }

  resetForm(form: NgForm) {
    form.resetForm();
  }

  moveToPortal() {
   // this.router.navigate(['/portal']);
  }


}
