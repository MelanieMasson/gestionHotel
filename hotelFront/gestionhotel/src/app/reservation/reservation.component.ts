import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeOutMessage } from 'src/environments/environment';
import { Reservation } from '../classes/reservation/reservation';
import { ReservationService } from '../services/reservation/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  reservation?:Array<Reservation>;
  errorMessage = "";
  success: boolean = false;
  searchVar :string = "";

  constructor(private reservationService:ReservationService, private router:Router) { }

  ngOnInit(): void {
    this.loadAll();
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
      next: (data) => { this.reservation = data },
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
}