import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CHECK_EMAIL, timeOutMessage } from 'src/environments/environment';
import { Hotel } from '../classes/hotel/hotel';
import { HotelService } from '../services/hotel/hotel.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  hotelForm = new FormGroup({
    id : new FormControl(""),
    nom : new FormControl(""  , Validators.required ),
    etoiles : new FormControl(""  , Validators.required ),
    adresse : new FormControl( "", Validators.required),
    telephone : new FormControl(""  , [Validators.required]),
    email : new FormControl( "", [Validators.pattern(CHECK_EMAIL)]),
    ville : new FormControl( "", Validators.required)
  });

  hotel ?: Array<Hotel>;
  errorMessage = "";
  success: boolean = false;

  constructor(private hotelService: HotelService, private router: Router) { }

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

  resetForm(){
    this.hotelForm = new FormGroup({
      id : new FormControl(""),
      nom : new FormControl(""  , Validators.required ),
      etoiles : new FormControl(""  , Validators.required ),
      adresse : new FormControl( "", Validators.required),
      telephone : new FormControl(""  , [Validators.required]),
      email : new FormControl( "", [Validators.pattern(CHECK_EMAIL)]),
      ville : new FormControl( "", Validators.required)
    });
  }

  loadAll(){
    this.hotelService.findAll().subscribe({
      next: (data) => { this.hotel = data },
      error: (err) => { this.showError(err.error.message) }
    })
  }

  loadById(id : number){
    this.hotelService.findHotelById(id).subscribe({
      next: (data) => { this.hotelForm.setValue(data) },
      error: (err) => { this.showError(err.error.message) }
    })
  }

  delete(id:number){
    this.hotelService.deleteHotel(id).subscribe({
      next: (data) => {
        this.loadAll();
        this.showSuccess();
      },
      error: (err) => { this.showError(err.error.message) }
    })
  }

  submit(){
    let client = this.hotelForm.value;
    let obs: Observable<any>;
    if (client.id == undefined || client.id == "" || client.id == 0){
      obs = this.hotelService.addHotel(client);
    } else {
      obs = this.hotelService.editHotel(client);
    }

    obs.subscribe({
      next: (data) => {
        this.loadAll();
        this.showSuccess();
      },
      error: (err) => { this.showError(err.error.message) }
    })
  }
}
