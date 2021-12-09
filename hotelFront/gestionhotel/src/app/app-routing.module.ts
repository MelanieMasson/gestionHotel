import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsDetailComponent } from './clients/clients-detail/clients-detail.component';
import { ClientsComponent } from './clients/clients.component';
import { HotelsComponent } from './hotels/hotels.component';
import { LoginComponent } from './login/login.component';
import { ReservationsDetailComponent } from './reservations/reservations-detail/reservations-detail.component';
import { ReservationsComponent } from './reservations/reservations.component';

const routes: Routes = [
  { path : "" , component: LoginComponent },
  { path : "login" , component: LoginComponent },
  { path : "clients" , component: ClientsComponent },
  { path : "clients/addedit/:id" , component: ClientsDetailComponent },
  { path : "hotels" , component: HotelsComponent },
  //{ path : "hotels/addedit/:id" , component: HotelsDetailComponent },
  { path : "reservations" , component: ReservationsComponent },
  { path : "reservations/addedit/:id" , component: ReservationsDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
