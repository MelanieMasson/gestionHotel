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
    return this.http.get<Client[]>(environment.backendUri + 'client', this.config.httpOptions);
  }

  findClientById(id?:number) : Observable<Client>{
    return this.http.get<Client>(environment.backendUri + "client/" + id, this.config.httpOptions);
  }

  addClient(client?:Client) : Observable<any>{
    return this.http.post(environment.backendUri + "client", client, this.config.httpOptions);
  }

  editClient(client:Client) : Observable<any>{
    return this.http.put(environment.backendUri + "client/" + client.id, client, this.config.httpOptions);
  }

  deleteClient(id?:number) : Observable<any>{
    return this.http.delete(environment.backendUri +  "client/" + id, this.config.httpOptions);
  }

}
