import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { apiServices } from '../services/api.services';

@Component({
  selector: 'app-summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.css']
})
export class SummaryReportComponent implements OnInit {

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
    Date: '',
    Open: '',
    Closed: '',
    Cancelled: ''
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

  displayedColumns: string[] = ['Date', 'Open', 'Closed', 'Cancelled', 'Total'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);

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
        let resArray = res['result'];

        let dateObj = {};

        for (let data of resArray) {
          if (!dateObj[data.appointment_date]) {
            dateObj[data.appointment_date] = { 'Closed': 0, Open: 0, "Cancelled": 0 }
          }
        }


        for (let data of resArray) {
          if (data.appointment_date in dateObj) {
            dateObj[data.appointment_date][data.appointment_status] += 1;
          }
        }

        let finalObject = [];

        for(let data in dateObj) {
          finalObject.push({'Date' : data, ...dateObj[data]});
        }
         this.dataSource = new MatTableDataSource(<any> finalObject);
      });

    }
  }

}


export interface SummaryFields {
  Date: any;
  Open: any;
  Closed: any;
  Cancelled: any;
}
