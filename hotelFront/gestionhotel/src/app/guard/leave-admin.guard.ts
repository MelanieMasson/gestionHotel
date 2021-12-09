import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/classes/admin/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {

  constructor(private router : Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if( sessionStorage.getItem("connected")){
        return true; 
      }

    this.router.navigate(['login']) 
    return false;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  authenticated() {
    return (sessionStorage.getItem("connected"));
  }

  findAdmin() : Admin{
    let admin : Admin; 
    let ss = sessionStorage.getItem("admin")
    if( ss != null ){
      admin = JSON.parse(ss);

      return admin; 
    }else{
      return new Admin(); 
    }
  }

  findAdminUsername() : string | undefined{
    let admin : Admin; 
    let ss = sessionStorage.getItem("admin")
    if( ss != null ){
      admin = JSON.parse(ss);

      return admin.username; 
    }else{
      return ""; 
    }
  }
  
}
