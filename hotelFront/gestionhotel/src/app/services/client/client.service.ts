import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/classes/client/client';
import { environment } from 'src/environments/environment';
import { ConfigService } from '../configuration/config.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  serviceUri : string = "client";

  constructor( private http : HttpClient , private config : ConfigService) { }

  findAll() : Observable<Client[]>{
    return this.http.get<Client[]>(environment.backendUri + this.serviceUri, this.config.httpOptions);
  }

  findClientById(id?:number) : Observable<Client>{
    return this.http.get<Client>(environment.backendUri + this.serviceUri + "/" + id, this.config.httpOptions);
  }

  addClient(client?:Client) : Observable<any>{
    return this.http.post(environment.backendUri + this.serviceUri, client, this.config.httpOptions);
  }

  editClient(client?:Client) : Observable<any>{
    return this.http.post(environment.backendUri + this.serviceUri + "/" + client?.id, client, this.config.httpOptions);
  }

  deleteClient(id?:number) : Observable<any>{
    return this.http.delete(environment.backendUri + this.serviceUri+id, this.config.httpOptions);
  }

}
