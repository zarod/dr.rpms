import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsComponent } from './patients/patients.component';
import { HospitalsComponent } from './hospitals/hospitals.component';

const routes: Routes = [
  { path: 'patients', component: PatientsComponent },
  { path: 'hospitals', component: HospitalsComponent },
  //{ path: '', redirectTo: '/patients', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
