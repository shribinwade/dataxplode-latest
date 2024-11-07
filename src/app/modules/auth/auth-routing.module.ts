import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth-components/signup/signup.component';
import { LoginComponent } from './auth-components/login/login.component';
import { ForgotpasswordComponent } from './auth-components/forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './auth-components/changepassword/changepassword.component';

const routes: Routes = [

{
    path: '',
    redirectTo:'signup',
    pathMatch:'full'
},
{
  path:'signup',
  component: SignupComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'forgot-password',
  component: ForgotpasswordComponent
},
{
  path: 'reset-password',
  component: ChangepasswordComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
