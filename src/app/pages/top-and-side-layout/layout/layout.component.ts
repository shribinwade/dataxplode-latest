import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth-service/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  animations: [
    trigger('sidenavAnimation', [
      // State when sidenav is opened
      state('open', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      // State when sidenav is closed
      state('closed', style({
        transform: 'translateX(-100%)', // Slide out of view
        opacity: 0
      })),
      // Transition from closed to open
      transition('closed => open', [
        animate('300ms ease-out') // Animation timing
      ]),
      // Transition from open to closed
      transition('open => closed', [
        animate('300ms ease-in') // Animation timing
      ])
    ])
  ]
})
export class LayoutComponent {



  constructor(private observer: BreakpointObserver,private authService:AuthService,private route:Router) {
  
    // if(authService.isAuthenticated()){

    //   authService.userStatus.subscribe({
    //     next: (status)=>{
    //       if(status == 'loggedIn'){
    //             if(authService.isLoggedIn()){

    //             } else{
    //               this.route.navigate(['/home']);
    //             }  
             
    //       }else{
    //         this.route.navigate(['/home']);
    //       }
    //     }
    //   })
  
    // }{
    //   this.route.navigate(['home']);
    // }

   
   }

  private breakpointSub!: Subscription;


  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSidenavOpen = true;
  isMobile!: boolean;
  closeWidth = 65;
  openWidth = 256;
  isExpanded: boolean = true;
  sideNavDefaultOpened = true;
  sideNavMode!: 'side' | 'over' | 'push';
  isAdmin!: boolean;

  ngOnInit(): void {
    this.breakpointSub = this.observer.observe([Breakpoints.XSmall]).subscribe((state: BreakpointState) => {
      if (state.matches) {               // check screen width matches 
        this.isMobile = true;                    
        this.sideNavMode = 'over';

        if (this.sideNavDefaultOpened) {                 //side nav closed if open                                           
          this.sideNavDefaultOpened = false;           // this.sideNavDefaultOpened = false;
          this.isExpanded = true;                 //set true for content margin-left so content will not shift to right
          
        }
       
      }
      else {
       
        this.isMobile = false;                // mobile width check condition 
        this.sideNavDefaultOpened = true;
        
        this.isExpanded = false;
        this.sideNavMode = 'side';
      }
    })
  }


  profileRoute(){
    this.isAdmin = this.authService.getUserInfo()?.role ==='admin';
    const id = this.authService.getUserInfo()?.id;    
    if(this.isAdmin){
      this.route.navigate(['dashboard/admin/profiles']);
    }else{
      this.route.navigate(['dashboard/user/profiles/profile/'+ id]);
    }
    
  }
 




  toggleSideNav() {
    // this.isExpanded = !this.isExpanded;
    // if (this.isMobile) {
    //   if (this.isExpanded){
    //     setTimeout(() => {
    //       this.sidenav.toggle();
         
    //     }, 500);
    //   } 
    //   else {
    //     this.sidenav.toggle();
    //   }
    //   this.isExpanded = true;
    // }  
    if(!this.isMobile){
      
      this.isExpanded = !this.isExpanded;
    }
    if (this.isMobile) {
     
      if(this.sideNavDefaultOpened){
        this.sideNavDefaultOpened = false;
      }else{
        
        this.sideNavDefaultOpened = true;
        this.isExpanded=true;
      }
    } 
  }

  logout(){
    this.authService.userDataSubject.next(null);
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.route.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.breakpointSub.unsubscribe();
  }

}
