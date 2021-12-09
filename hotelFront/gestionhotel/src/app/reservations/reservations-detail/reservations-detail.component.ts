import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from 'src/app/classes/client/client';
import { Hotel } from 'src/app/classes/hotel/hotel';
import { ClientService } from 'src/app/services/client/client.service';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { timeOutMessage } from 'src/environments/environment';

@Component({
  selector: 'app-reservations-detail',
  templateUrl: './reservations-detail.component.html',
  styleUrls: ['./reservations-detail.component.css']
})
export class ReservationsDetailComponent implements OnInit {

  reservationForm = new FormGroup({
    id: new FormControl(""),
    client: new FormControl(null, Validators.required),
    hotel: new FormControl(null, Validators.required),
    datedeb: new FormControl("", Validators.required),
    datefin: new FormControl("", Validators.required),
    numChambre: new FormControl("", Validators.required)
  });;

  clients: Array<Client> = [];
  hotels: Array<Hotel> = [];
  errorMessage = "";

  showError(msg: string) {
    this.errorMessage = msg;
    setTimeout(() => {
      this.errorMessage = "";
    }, timeOutMessage)
  }

  constructor(private aRoute: ActivatedRoute, private reservationService: ReservationService, private router: Router, private clientService: ClientService, private hotelService: HotelService) {
    let reservationId = Number(this.aRoute.snapshot.paramMap.get('id'));
    if (reservationId > 0) {
      this.reservationService.findReservationById(reservationId).subscribe({
        next: (data) => { this.reservationForm.setValue(data) },
        error: (err) => { this.showError(err.error.message) }
      })
    }
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.loadAllHotel();
    this.loadAllClient();  
  }

  loadAllHotel(){
    this.hotelService.findAll().subscribe({
      next: (data) => { this.hotels = data },
      error: (err) => { this.showError(err.error.message) }
    })
  }

  loadAllClient(){
    this.clientService.findAll().subscribe({
      next: (data) => { this.clients = data },
      error: (err) => { this.showError(err.error.message) }
    })
  }

  compareClient(c1?: Client, c2?: Client): boolean {
    return (c1?.id === c2?.id)
  }

  compareHotel(h1?: Hotel, h2?: Hotel): boolean {
    return (h1?.id === h2?.id)
  }

  goBack(){
    this.router.navigate(['reservations'])
  }

  resetForm(){
    this.reservationForm = new FormGroup({
      id: new FormControl("", Validators.required),
      datedeb: new FormControl("", Validators.required),
      datefin: new FormControl("", Validators.required),
      numChambre: new FormControl("", Validators.required),
      client: new FormControl(null, Validators.required),
      hotel: new FormControl(null, Validators.required)
    });
  }

  submit() {
    let reservation = this.reservationForm.value;
    let obs: Observable<any>;
    if (reservation.id == undefined || reservation.id == "" || reservation.id == 0) {
      obs = this.reservationService.addReservation(reservation);
    } else {
      obs = this.reservationService.editReservation(reservation);
    }

    obs.subscribe({
      next: (data) => {
        this.resetForm();
        this.router.navigate(['reservations'])
      },
      error: (err) => { this.showError(err.error.message) }
    })
  }

}
