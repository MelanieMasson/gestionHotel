import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeOutMessage } from 'src/environments/environment';
import { Client } from '../classes/client/client';
import { Reservation } from '../classes/reservation/reservation';
import { ClientService } from '../services/client/client.service';
import { ConfigService } from '../services/configuration/config.service';
import { ReservationService } from '../services/reservation/reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
  providers: [ConfigService]
})
export class ReservationsComponent implements OnInit {

  client: Client = new Client()
  clientReservation: Array<any> = []
  clients: Array<Client> = []

  reservations?:Array<Reservation>;
  errorMessage = "";
  success: boolean = false;
  searchVar :string = "";

  constructor(private reservationService:ReservationService, private clientService:ClientService, private router:Router , public config: ConfigService) { }

  ngOnInit(): void {
    this.loadAll();
    this.reloadClients();
  }

  showSuccess(): void {
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, timeOutMessage)
  }

  showError(msg:string){
    this.errorMessage = msg;
    setTimeout(() => {
      this.errorMessage = "";
    }, timeOutMessage)
  }

  search(){
  }

  loadAll(){
    this.reservationService.findAll().subscribe({
      next: (data) => { this.reservations = data },
      error: (err) => { this.showError(err.error.message) }
    })
  }

  delete(id?:number){
    this.reservationService.deleteReservation(id).subscribe({
      next: (data) => {
        this.loadAll();
        this.showSuccess();
      },
      error: (err) => { this.showError(err.error.message) } 
    })
  }

  getClientReservation(): void {
    this.clientReservation = [];
    this.reservationService.findAll().subscribe(
      data => {
        data.forEach( reservation => {
          if( reservation.client != undefined && reservation.client.id != undefined ){
            if( this.clientReservation[reservation.client.id] == undefined ){
              this.clientReservation[reservation.client.id] = []
            }
            this.clientReservation[reservation.client.id].push( reservation ) 
          }
        } )
        let clientTries : Array<Client> = []
        data.forEach( reservation => {
          if( reservation.client != undefined )
            clientTries.push(reservation.client)
        } )
        this.clients.forEach( client => {
          if( client.id != undefined && this.clientReservation[client.id] == undefined )
            clientTries.push(client)
        } )
        this.clients = clientTries
      }
    )
  }

  reloadClients() {
    console.log(this.config.httpOptions.headers)
    
    //this.clientService.findAll(this.search).subscribe(
    this.clientService.findAll().subscribe(
      data => { 
        this.clients = data 
        this.getClientReservation()

        console.log( this.clientReservation )
      }
      //, err => console.log( "Une erreur est survenue" )
    );
    
  }

}
