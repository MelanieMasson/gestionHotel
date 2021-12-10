import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { timeOutMessage } from 'src/environments/environment';
import { Hotel } from '../classes/hotel/hotel';
import { HotelService } from '../services/hotel/hotel.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  // hotelForm = new FormGroup({
  //   id : new FormControl(""),
  //   nom : new FormControl(""  , Validators.required ),
  //   etoiles : new FormControl(""  , Validators.required ),
  //   adresse : new FormControl( "", Validators.required),
  //   telephone : new FormControl(""  , Validators.required),
  //   email : new FormControl( "", Validators.required),
  //   ville : new FormControl( "", Validators.required)
  // });

  hotels: Array<Hotel> = [];
  hotel: Hotel = new Hotel();
  errorMessage = "";
  success: boolean = false;

  @ViewChild('closebutton') closebuttonelement: any;
  @ViewChild('fileInput') inputEl: ElementRef | undefined;


  constructor( private hotelsService: HotelService) { }

  ngOnInit(): void {
    this.loadAll();
    // let hotelId = Number(this.aRoute.snapshot.paramMap.get('id'));
    // if (hotelId) {
    //   this.hotelsService.findHotelById(hotelId).subscribe(
    //     data => this.hotelForm.setValue(data) 
    //   )
    // }
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

  /*resetForm(){
    this.hotelForm = new FormGroup({
      id : new FormControl(""),
      nom : new FormControl(""  , Validators.required ),
      etoiles : new FormControl(""  , Validators.required ),
      adresse : new FormControl( "", Validators.required),
      telephone : new FormControl(""  , [Validators.required]),
      email : new FormControl( "", [Validators.required]),
      ville : new FormControl( "", Validators.required)
    });
  }*/

  loadAll(){
    this.hotelsService.findAll().subscribe({
      next: (data) => { this.hotels = data },
      error: (err) => { this.showError(err.error.message) }
    })
  }

  loadById(id : number){
    this.hotelsService.findHotelById(id).subscribe({
      next: (data) => { this.hotel = data },
      error: (err) => { this.showError(err.error.message) }
    })
  }

  delete(id:number){
    this.hotelsService.deleteHotel(id).subscribe({
      next: (data) => {
        this.loadAll();
        this.showSuccess();
      },
      error: (err) => { this.showError(err.error.message) }
    })
  }

  /*submit(){
    let hotel = this.hotelForm.value;
    let obs: Observable<any>;
    if (hotel.id == undefined || hotel.id == "" || hotel.id == 0){
      obs = this.hotelsService.addHotel(hotel);
    } else {
      obs = this.hotelsService.editHotel(hotel);
    }

    obs.subscribe({
      next: (data) => {
        this.loadAll();
        this.showSuccess();
        this.router.navigate(['hotels'])
      },
      error: (err) => { this.showError(err.error.message) }
    })
  }*/

  submit(){
    let inputEl: HTMLInputElement = this.inputEl?.nativeElement;
    console.log( inputEl.files );
    
    if (inputEl != undefined&& inputEl.files != undefined){
      let fileCount:number = inputEl.files.length;
      let formData = new FormData();

      formData.append('nom', "" + this.hotel.nom);
      formData.append('etoiles', "" + this.hotel.nom);
      formData.append('adresse', "" + this.hotel.adresse);
      formData.append('telephone', "" + this.hotel.telephone);
      formData.append('email', "" + this.hotel.email);
      formData.append('ville', "" + this.hotel.ville);
      formData.append('images', "" + this.hotel.images);

      if (fileCount > 0) {
        formData.append('images', inputEl.files[0]);
      }

    }
    let obs: Observable<any>;
    if (this.hotel.id == undefined) {
      obs = this.hotelsService.addHotel(this.hotel);
    } else {
      obs = this.hotelsService.editHotel(this.hotel);
    }

    obs.subscribe(
      {
        next: () => {
          this.loadAll();
          this.closebuttonelement.nativeElement.click();
          this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 5000);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        }
      }
    );
  }

  getTabEtoile(nbEtoiles:number){
    return new Array(nbEtoiles)
  }
}
