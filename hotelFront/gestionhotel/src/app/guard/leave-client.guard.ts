import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientDetailComponent } from '../client/client-detail/client-detail.component';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanDeactivate<ClientDetailComponent> {
  canDeactivate(
    component: ClientDetailComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (component.clientForm.get('nomComplet')?.value != "" || component.clientForm.get('telephone')?.value != "" || component.clientForm.get('email')?.value != "" || component.clientForm.get('adresse')?.value != "")
      return false;
    return true;
  }
}
