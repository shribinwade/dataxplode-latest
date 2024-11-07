import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './auth-components/login/login.component';
import { SignupComponent } from './auth-components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ForgotpasswordComponent } from './auth-components/forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './auth-components/changepassword/changepassword.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotpasswordComponent,
    ChangepasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
