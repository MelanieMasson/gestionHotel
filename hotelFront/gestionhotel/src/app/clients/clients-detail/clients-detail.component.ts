import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientService } from 'src/app/services/client/client.service';
import { CHECK_EMAIL, timeOutMessage } from 'src/environments/environment';

@Component({
  selector: 'app-client-detail',
  templateUrl: './clients-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientsDetailComponent implements OnInit {

  clientForm = new FormGroup({
    id : new FormControl(""),
    nomComplet : new FormControl(""  , Validators.required ),
    telephone : new FormControl(""  , [Validators.required]),
    email : new FormControl( "", [Validators.pattern(CHECK_EMAIL)]),
    adresse : new FormControl( "", Validators.required)
  });
  
  errorMessage = "";

  showError(msg:string){
    this.errorMessage = msg;
    setTimeout(() => {
      this.errorMessage = "";
    }, timeOutMessage)
  }

  goBack(){
    this.router.navigate(['reservation'])
  }

  resetForm(){
    this.clientForm = new FormGroup({
      id : new FormControl(""),
      nomComplet : new FormControl(""  , Validators.required ),
      telephone : new FormControl(""  , [Validators.required]),
      email : new FormControl( "", [Validators.pattern(CHECK_EMAIL)]),
      adresse : new FormControl( "", Validators.required)
    });
  }

  constructor(private aRoute: ActivatedRoute, private clientService:ClientService, private router:Router) {
    let clientId = Number(this.aRoute.snapshot.paramMap.get('id'));
    if (clientId > 0) {
      this.clientService.findClientById(clientId).subscribe({
        next: (data) => { this.clientForm.setValue(data) },
        error: (err) => { this.showError(err.error.message) }
      })
    }
   }

  ngOnInit(): void {
  }

  submit(){
    let client = this.clientForm.value;
    let obs: Observable<any>;
    if (client.id == undefined || client.id == "" || client.id == 0){
      obs = this.clientService.addClient(client);
    } else {
      obs = this.clientService.editClient(client);
    }

    obs.subscribe({
      next: (data) => {
        this.clientForm.reset();
        this.router.navigate(['clients'])
      },
      error: (err) => { this.showError(err.error.message) }
    })
  }

}
