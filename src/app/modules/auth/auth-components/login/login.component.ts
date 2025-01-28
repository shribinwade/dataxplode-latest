import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomSnackbarService } from '../../../../core/services/snackbar-service/custom-snackbar.service';

import { GlobalConstants } from '../../../../core/constants/global-constants';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service/auth.service';
import { routeAnimationState } from '../../../../shared/animations/route-animation/route-animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations:[routeAnimationState]
})
export class LoginComponent implements OnInit {

  signinFormGroup:any= FormGroup;
  isLoading = false;
  signinUser: any [] = [];
  hide = true;
  password = true;
  responseMessage:any;

  constructor(
    private formBuilder: FormBuilder,
    private globalSnackbar: CustomSnackbarService,
    private router:Router,
    // private loadingService:LoadingService,
    private authservice: AuthService
  ){}
  ngOnInit(): void {
       //SignupFromGroup
       this.signinFormGroup=this.formBuilder.group({
        email: ["shribinwade.100@gmail.com",[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
        password: ["Admin@123",[Validators.required]],
        rememberMe: [false] // Default to unchecked
      })
  }



  signInSubmit() {
      debugger
      this.isLoading = true;
      const formdata=this.signinFormGroup.value;
      const rememberMe = formdata.rememberMe;
      //converting into json
      let data = {
        email: formdata.email,
        password: formdata.password
      }
    
      this.authservice.login(data).subscribe((response:any)=>{
        debugger
           this.isLoading = false;
           this.hide=false;

           if(rememberMe){
             // Save the token in localStorage for persistent login (long-term)
             sessionStorage.removeItem('token');
             localStorage.setItem('token',response.token);
           }else{
             // Save the token in sessionStorage for session-based login
            //  check existing localstorage token if present delete it
             localStorage.removeItem('token');
             sessionStorage.setItem('token', response.token);
           }
           this.authservice.userStatus.next("loggedIn");
          //  console.log(this.authservice.getUserInfo());
          
           if(response){
           const role = this.authservice.getUserInfo()?.role;
           if(role?.includes("User"))
            this.router.navigate(['/dashboard/user/home']);
           } else{
            this.router.navigate(['/dashboard/admin/home']);
           }    
      },(error)=>{
        this.hide=false;
        this.isLoading = false;
        console.log(error);
        
        if(error.error?.message){
          this.responseMessage = error.error?.message;
          this.globalSnackbar.showError(this.responseMessage,GlobalConstants.error);
        }
        else{
          this.responseMessage = GlobalConstants.genericError;
        }
        this.globalSnackbar.showError(this.responseMessage,GlobalConstants.error);
        this.signinFormGroup.setErrors({unauthenticated:true})
        
      });
  
  }

  onReset() {
    this.signinFormGroup.reset(); // Reset the form
    this.isLoading = false;  // Reset loading state, just in case
  }
  

}
