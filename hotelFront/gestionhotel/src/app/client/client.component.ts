import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeOutMessage } from 'src/environments/environment';
import { Client } from '../classes/client/client';
import { ClientService } from '../services/client/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  client ?: Array<Client>;
  errorMessage = "";
  success: boolean = false;
  searchVar :string = "";

  constructor(private clientService: ClientService, private router:Router) { }

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
    this.clientService.findAll().subscribe({
      next: (data) => { this.client = data },
      error: (err) => { this.errorMessage = err.error.message }
    })
  }

  delete(id:number){
    this.clientService.deleteClient(id).subscribe({
      next: (data) => {
        this.loadAll();
        this.showSuccess();
      },
      error: (err) => { this.showError(err.error.message) }
    })
  }
}
