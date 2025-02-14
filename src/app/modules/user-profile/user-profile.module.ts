import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './component/profile/profile.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    SharedModule
  ]
})
export class UserProfileModule { }
