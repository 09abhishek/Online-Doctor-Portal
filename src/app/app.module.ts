import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import {MatCardModule, MatDatepickerModule, MatExpansionModule, MatIconModule, MatNativeDateModule, MatPaginatorModule, MatTableModule, MatToolbarModule} from '@angular/material';

import { AppComponent } from './app.component';
import { DoctorDirectoryComponent } from './doctor-directory/doctor-directory.component';
import { LoginComponent } from './login/login.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SummaryReportComponent } from './summary-report/summary-report.component';
import { MonthlyReportComponent } from './monthly-report/monthly-report.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    DoctorDirectoryComponent,
    LoginComponent,
    BookAppointmentComponent,
    NotFoundPageComponent,
    HeaderComponent,
    DoctorDashboardComponent,
    SummaryReportComponent,
    MonthlyReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    OwlDateTimeModule, OwlNativeDateTimeModule

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
