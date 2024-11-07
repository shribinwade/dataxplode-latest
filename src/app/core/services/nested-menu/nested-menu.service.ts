import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NestedMenuService {

  // Initial state set to 'false' (menu is closed)
  private nestedMenuOpenSource = new BehaviorSubject<boolean>(false);

  // Observable that components can subscribe to
  nestedMenuOpen$ = this.nestedMenuOpenSource.asObservable();

  // Method to set the state of the menu
  setNestedMenuOpen(state: boolean) {
    this.nestedMenuOpenSource.next(state);
  }

  // Toggle the current state of the menu
  toggleMenu() {
    const currentState = this.nestedMenuOpenSource.getValue();
    this.nestedMenuOpenSource.next(!currentState);
  }
  
}
