import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service/auth.service';
import { Subject, takeUntil } from 'rxjs';
export interface user {
  userId: number
  username: string
  email: string
  contactNumber: string
  userStatus: string
  enabled: boolean
  role: Role
  subscription: Subscription
}

export interface Role {
  roleId: number
  roleName: string
  createdAt: string
  updatedAt: string
}

export interface Subscription {
  subscriptionId: number
  startDate: string
  endDate: string
  nextBillingDate: string
  status: any
  plan: Plan
}

export interface Plan {
  planId: number
  planname: string
  searchLimit: number
  planprice: number
  description: string
  billingCycle: string
  createdAt: string
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  profileId?:string;
  userDetails?: user;

  isLoading?:boolean;

  private destroy$ = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute , private authService: AuthService,private cdr: ChangeDetectorRef){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== null) {
      this.profileId = id // Convert to number safely
      console.log(this.profileId);
    } 
  
  }
 
  ngOnInit(): void {
    
    if (!this.profileId) {
    
      console.error('Profile ID is undefined');
      return;
    }

    this.authService.getUserDetails({ userId: this.profileId });

    this.authService.userDataSubject
      .pipe(takeUntil(this.destroy$)) // Auto unsubscribe when component is destroyed
      .subscribe(
        (res: user | null) => {
          if (res) {

            this.userDetails = res;
            this.isLoading = true;
            console.log('User details received:', res);
          } else {
            console.warn('User details are null');
            this.isLoading = false;
          }
         
        },
        (error) => {
          console.error('Error fetching user details:', error);
          this.isLoading = false;
        }
      );
  } 

  //checkout logout() method to remove behivorsubject previous value


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  
   
}
