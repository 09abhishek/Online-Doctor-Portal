import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiURL} from '../config/common-url';

@Injectable({
  providedIn : 'root'
})
export class apiServices {

  private selecteDoctorID = '';

  constructor(private http: HttpClient) {
  }

  changeAppointmentStatus(data) {
    return this.http.post( apiURL +'editAppointmentStatus', data);
  }

  getAppointmentsByDoctorID(data) {
    return this.http.post( apiURL +'getAppointmentsByDoctorID', data);
  }

  fetchAllDoctors() {
    return this.http.get( apiURL +'getAllDoctors');
  }

  fetchDoctorDetailsByID(movieID) {
    return this.http.get( apiURL +'getDoctorDetailsByID/'+ movieID);
  }

  addAppointment(appointmentData) {
    return this.http.post( apiURL +'addNewAppointment', appointmentData);
  }

}
