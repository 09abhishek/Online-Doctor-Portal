import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { DoctorDirectoryComponent } from './doctor-directory/doctor-directory.component';
import { LoginComponent } from './login/login.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

const appRoutes: Routes = [
  { path: '', component: DoctorDirectoryComponent},
  { path: 'portal', component: DoctorDirectoryComponent},
  { path: 'login', component: LoginComponent},
  { path: 'doctorDashboard', component: DoctorDashboardComponent, canActivate: [AuthGuard]},
  { path: 'doctorInfo/:id', component: BookAppointmentComponent },
  { path: '404', component: NotFoundPageComponent},
  { path: '**', component: NotFoundPageComponent }
];



@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
