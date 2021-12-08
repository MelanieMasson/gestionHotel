import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthGuard } from 'src/app/guard/leave-admin.guard';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {  

  httpOptions = {
    headers : new HttpHeaders({
      'Authorization' : "Basic" 
    })
  }
  
  constructor( private guard : AuthGuard ) {     
    this.httpOptions = {
      headers : new HttpHeaders({
        'Authorization' : "Basic " + guard.findAdmin().password
      })
    } 
  } 


}
