import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { apiServices } from '../services/api.services';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit, AfterViewInit {
  endTime = '';
  startTime = '';
  reportEndDate = '';
  reportStartDate = '';
  doctor_name = '';
  today: any;
  sixMonthsAgo = '';
  summaryStartDate = '';
  summaryEndDate = '';

  doctor_id = localStorage.getItem('doctor_id')


  ELEMENT_DATA: Fields[] = [{
    appointment_date: '',
    appointment_time: '',
    patient_name: '',
    patient_email: '',
    patient_phone: '',
    appointment_status: ''
   }];

  SUMMARY_DATA: SummaryFields[] = [{
    appointment_date: '',
    patient_name: '',
    appointment_status: ''
   }];

  constructor(private apiService: apiServices,
    private router: Router) {

  }



  openDatePicker(dp) {
    dp.open();
  }

  closeDatePicker(eventData: any, dp?:any) {
    this.summaryStartDate = moment(eventData).endOf('month').format('YYYY-MM-DD');
    this.summaryEndDate = moment(eventData).startOf('month').format('YYYY-MM-DD');
     dp.close();
  }

  ngOnInit() {
    this.today = new Date();
    this.doctor_name = localStorage.getItem('doctor_name');
    let data = {
      doctor_id: this.doctor_id,
      start_date:  moment(new Date).format('YYYY-MM-DD'),
      end_date: moment(new Date).format('YYYY-MM-DD')
    }

    this.apiService.getAppointmentsByDoctorID(data).subscribe((res) => {
      this.dataSource = res['result'];
    });
  }


  displayedColumns: string[] = [
    'Date',
    'Time',
    'Name',
    'Email',
    'Phone',
    'Status',
    'action'];

  displayedColumns2: string[] = [
    'Date',
    'Name',
    'Status'
  ];

  dataSource = new MatTableDataSource<Fields>(this.ELEMENT_DATA);
  dataSource2 = new MatTableDataSource<SummaryFields>(this.SUMMARY_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource2.paginator = this.paginator;
  }

  setStartDate(event) {
    this.startTime = moment(event.target.value).format('YYYY-MM-DD');
  }

  setEndDate(event) {
    this.endTime = moment(event.target.value).format('YYYY-MM-DD');
  }

  reportSummaryEndDate(event) {
    this.reportEndDate = moment(event.target.value).format('YYYY-MM-DD');
  }

  reportSummaryStartDate(event) {
    console.log('ASDAS');


    this.reportStartDate = moment(event.target.value).format('YYYY-MM-DD');
  }

  fetchAppointments() {
    if (this.startTime && this.endTime) {
      let data = {
        doctor_id: this.doctor_id,
        start_date: this.startTime,
        end_date :  this.endTime
      }

      this.apiService.getAppointmentsByDoctorID(data).subscribe((res) => {
        this.dataSource = res['result'];
      });

    }
  }


  closeAppointment(element) {
    console.log(element);
    this.apiService.changeAppointmentStatus({appointment_id : element.appointment_id, appointment_status : "Closed"}).subscribe((res) => {
      alert(res['result']);

      this.fetchAppointments();
    });

  }

  cancelAppointment(element) {
    console.log(element);
    this.apiService.changeAppointmentStatus({appointment_id : element.appointment_id, appointment_status : "Cancelled"}).subscribe((res) => {
      alert(res['result']);

      this.fetchAppointments();
    });

  }

}

export interface Fields {
  appointment_date: any;
  appointment_time: any;
  patient_name: any;
  patient_email: any;
  patient_phone: any;
  appointment_status: any;
}

export interface SummaryFields {
  appointment_date: any;
  patient_name: any;
  appointment_status: any;
}


