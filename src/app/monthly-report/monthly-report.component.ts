import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { apiServices } from '../services/api.services';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css']
})
export class MonthlyReportComponent implements OnInit {

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

  ELEMENT_DATA: SummaryFields[] = [{
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

  closeDatePicker(eventData: any, dp?: any) {
    this.summaryEndDate = moment(eventData).endOf('month').format('YYYY-MM-DD');
    this.summaryStartDate = moment(eventData).startOf('month').format('YYYY-MM-DD');
    dp.close();
  }

  ngOnInit() {
    this.doctor_name = localStorage.getItem('doctor_name');
  }

  displayedColumns: string[] = ['Date', 'Name', 'Status'];
  dataSource = new MatTableDataSource<SummaryFields>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  fetchAppointments() {
    if (this.summaryStartDate && this.summaryEndDate) {
      let data = {
        doctor_id: this.doctor_id,
        start_date: this.summaryStartDate,
        end_date: this.summaryEndDate
      }

      this.apiService.getAppointmentsByDoctorID(data).subscribe((res) => {
        this.dataSource = res['result'];
      });

    }
  }

}


export interface SummaryFields {
  appointment_date: any;
  patient_name: any;
  appointment_status: any;
}

