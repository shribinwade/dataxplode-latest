import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MenuItem } from '../custom-sidenav/custom-sidenav.component';
import { NestedMenuService } from '../../../core/services/nested-menu/nested-menu.service';
import { Subscription } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
  animations:[
    trigger('expandContractMenu' , [
      transition(':enter',[
        style({opacity: 0, height: '0px'}),
        animate('500ms ease-in-out', style({opacity: 1, height: '*' }))
      ]),
      transition(':leave',[
        animate('500ms ease-in-out', style({opacity: 1, height: '0px' }))
      ])
    ])
  ]
})
export class MenuItemComponent implements OnChanges{

  @Input() item!:MenuItem;
  @Input() customStyles!: { [key: string]: any };
 
  private subscription: Subscription;
  
  profilePicSize!: number;

  nestedMenuOpen!: boolean;

  collaped!: boolean;


  constructor(public nestedMenuService : NestedMenuService) {
      this.subscription = this.nestedMenuService.nestedMenuOpen$.subscribe(state => {
      this.nestedMenuOpen = state;
  });

    
  }

  // Toggle the menu by calling the service
  toggleMenu() {
    if(!this.item.subItems){
      // console.log("inside if toggle");
      return;
    }
    this.nestedMenuOpen = !this.nestedMenuOpen
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customStyles']) {
      const width = this.customStyles?.['width.px'];
      this.profilePicSize = (width === 65) ? 32 : 100; // Set image size based on customStyles width
      this.collaped = (width ===65) ? true: false; 
    }
  }


  // Remember to clean up the subscription
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
