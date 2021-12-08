import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ClientDetailComponent } from './client/client-detail/client-detail.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path : "" , component: LoginComponent },
  { path : "login" , component: LoginComponent },
  { path : "client" , component: ClientComponent },
  { path : "client/add_edit/:id" , component: ClientDetailComponent },
  //{ path : "hotel" , component: HotelComponent },
  //{ path : "hotel/add_edit/:id" , component: HotelDetailComponent },
  //{ path : "reservation" , component: ReservationComponent },
  //{ path : "reservation/add_edit/:id" , component: ReservationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
