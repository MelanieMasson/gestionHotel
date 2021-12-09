import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';
import { Admin } from '../classes/admin/admin';
import { AdminGuard } from '../guard/leave-admin.guard';
import { ConfigService } from '../services/configuration/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = ""
  password = ""

  constructor( private http : HttpClient, private router : Router , private app : AppComponent, private guard: AdminGuard, private config: ConfigService) { }

  ngOnInit(): void { }

  authenticate(){
    let u = {"username" : this.username , "password" : this.password }
    
    this.http.post<Admin>( environment.backendUri + "login" , u ).subscribe(
      {
        next: (data) => { 
          sessionStorage.setItem("connected" , "1" ); 
          sessionStorage.setItem("admin" , JSON.stringify(data) )
          this.app.admin = data
          console.log( "Basic " + data.password ); 
          console.log( this.config.httpOptions.headers )
          
          this.config.httpOptions.headers = new HttpHeaders({'Authorization' : "Basic " + data.password});
          this.router.navigate(['client'])
          
        },
        error: (err) => { console.log(err.error.message) }
      }
    )
  }
}
