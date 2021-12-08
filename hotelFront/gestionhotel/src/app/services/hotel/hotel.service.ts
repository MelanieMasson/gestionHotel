import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from 'src/app/classes/hotel/hotel';
import { environment } from 'src/environments/environment';
import { ConfigService } from '../configuration/config.service';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  serviceUri : string = "hotel";

  constructor( private http : HttpClient , private config : ConfigService) { }

  findAll() : Observable<Hotel[]>{
    return this.http.get<Hotel[]>(environment.backendUri + this.serviceUri, this.config.httpOptions);
  }

  findHotelById(id?:number) : Observable<Hotel>{
    return this.http.get<Hotel>(environment.backendUri + this.serviceUri + "/" + id, this.config.httpOptions);
  }

  addHotel(hotel?:Hotel) : Observable<any>{
    return this.http.post(environment.backendUri + this.serviceUri, hotel, this.config.httpOptions);
  }

  editHotel(hotel?:Hotel) : Observable<any>{
    return this.http.post(environment.backendUri + this.serviceUri + "/" + hotel?.id, hotel, this.config.httpOptions);
  }

  deleteHotel(id?:number) : Observable<any>{
    return this.http.delete(environment.backendUri + this.serviceUri+id, this.config.httpOptions);
  }
}
