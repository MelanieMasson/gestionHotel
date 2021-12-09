import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../classes/admin/admin';
import { AdminGuard } from '../guard/leave-admin.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //admin : Admin = new Admin();

  constructor( private router : Router , public guard : AdminGuard) { }
  //constructor( private router : Router , public guard : AdminGuard , private cd: ChangeDetectorRef) { }

  ngOnInit(): void { }

  logout():void {
    console.log( "logout" ); 
    sessionStorage.removeItem("connected")
    sessionStorage.removeItem("admin")
    this.router.navigate(['login'])
  }

}
