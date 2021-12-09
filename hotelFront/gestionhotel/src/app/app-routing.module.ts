import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsDetailComponent } from './clients/clients-detail/clients-detail.component';
import { ClientsComponent } from './clients/clients.component';
import { AdminGuard } from './guard/leave-admin.guard';
import { ClientGuard } from './guard/leave-client.guard';
import { HotelsComponent } from './hotels/hotels.component';
import { LoginComponent } from './login/login.component';
import { ReservationsDetailComponent } from './reservations/reservations-detail/reservations-detail.component';
import { ReservationsComponent } from './reservations/reservations.component';

const routes: Routes = [
  //{ path : "" , component: LoginComponent },
  { path : "login" , component: LoginComponent },
  { path : "clients" , component: ClientsComponent, canActivate: [AdminGuard]},
  { path : "clients/addedit/:id" , component: ClientsDetailComponent, canActivate: [AdminGuard]},
  { path : "hotels" , component: HotelsComponent , canActivate: [AdminGuard]},

  { path : "reservations" , component: ReservationsComponent, canActivate: [AdminGuard]},
  { path : "reservations/addedit/:id" , component: ReservationsDetailComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


