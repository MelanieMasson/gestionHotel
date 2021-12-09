import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/classes/reservation/reservation';
import { environment } from 'src/environments/environment';
import { ConfigService } from '../configuration/config.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  serviceUri : string = "reservation";

  constructor( private http : HttpClient , private config : ConfigService) { }

  findAll(searchValue?:string) : Observable<Reservation[]>{
    return this.http.get<Reservation[]>(environment.backendUri + this.serviceUri + (searchValue != undefined ? "?search=" + searchValue : ""), this.config.httpOptions);
  }

  findReservationById(id?:number) : Observable<Reservation>{
    return this.http.get<Reservation>(environment.backendUri + this.serviceUri + "/" + id, this.config.httpOptions);
  }

  addReservation(resa?:Reservation) : Observable<any>{
    return this.http.post(environment.backendUri + this.serviceUri, resa, this.config.httpOptions);
  }

  editReservation(reservation?:Reservation) : Observable<any>{
    return this.http.put(environment.backendUri + this.serviceUri + "/" + reservation?.id, reservation, this.config.httpOptions);
  }

  deleteReservation(id?:number) : Observable<any>{
    return this.http.delete(environment.backendUri + this.serviceUri+id, this.config.httpOptions);
  }
}
