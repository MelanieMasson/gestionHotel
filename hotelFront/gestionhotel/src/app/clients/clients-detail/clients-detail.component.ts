import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientService } from 'src/app/services/client/client.service';
import { timeOutMessage } from 'src/environments/environment';

@Component({
  selector: 'app-clients-detail',
  templateUrl: './clients-detail.component.html',
  styleUrls: ['./clients-detail.component.css']
})
export class ClientsDetailComponent implements OnInit {

  clientForm = new FormGroup({
    id : new FormControl(""),
    nomComplet : new FormControl(""  , Validators.required ),
    telephone : new FormControl(""  , Validators.required),
    email : new FormControl( "", [Validators.required, Validators.email]),
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
    this.router.navigate(['clients'])
  }

  // resetForm(){
  //   this.clientForm = new FormGroup({
  //     id : new FormControl(""),
  //     nomComplet : new FormControl(""  , Validators.required ),
  //     telephone : new FormControl(""  , [Validators.required]),
  //     email : new FormControl( "", [Validators.required]),
  //     adresse : new FormControl( "", Validators.required)
  //   });
  // }

  constructor(private aRoute: ActivatedRoute, private clientService:ClientService, private router:Router) {
  }
  
  ngOnInit(): void {
    let clientId = Number(this.aRoute.snapshot.paramMap.get('id'));
    if (clientId) {
      this.clientService.findClientById(clientId).subscribe(
        data => this.clientForm.setValue(data) 
      )
    }
  }

  submit(){
    let client = this.clientForm.value;
    if( client.id == undefined || client.id == '' || client.id == 0 ){
      this.clientService.addClient(client).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['clients'])
        }
      )
    }else{
      this.clientService.editClient(client).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['clients'])
        }
      )
    }
  }

}
