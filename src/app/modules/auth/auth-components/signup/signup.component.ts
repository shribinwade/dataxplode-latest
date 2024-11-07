import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConstants } from '../../../../core/constants/global-constants';
import { AuthService } from '../../../../core/services/auth-service/auth.service';
import { CustomSnackbarService } from '../../../../core/services/snackbar-service/custom-snackbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signupFormGroup:any= FormGroup;
  isLoading = false;

  signupUsers: any [] = [];
  hide = true;
  password = true;
  confirmPassword = true;
  responseMessage:any;

  constructor(
    private formBuilder: FormBuilder,
    private globalSnackbar: CustomSnackbarService,
    // private router:Router,
    // private loadingService:LoadingService,
    private authservice: AuthService
  ){}
  

  ngOnInit(){

    //SignupFromGroup
    this.signupFormGroup=this.formBuilder.group({
      name: [null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber: [null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
      password: [null,[Validators.required,Validators.pattern(GlobalConstants.passwordRegex)]],
      confirmPassword:[null,[Validators.required,Validators.pattern(GlobalConstants.confirmpasswordRegex)]],
    })
  }

  onInputChange(event: any) {
    const input = event.target;
    if (input.value.length > 10) {
      input.value = input.value.slice(0, 10); // Trim the value to 10 digits
      // Update the form control value to reflect the change
      this.signupFormGroup.get('contactNumber').setValue(input.value, { emitEvent: false });
    }
  }

  validateSubmit(){
    if(this.signupFormGroup.controls['password'].value != this.signupFormGroup.controls['confirmPassword'].value){
    return true;
   }
    else{
      return false;
    }
  }

  onReset() {
    this.signupFormGroup.reset(); // Reset the form
    this.isLoading = false;  // Reset loading state, just in case
  }


  signUpSubmit() {

    this.isLoading = true;

    const formdata=this.signupFormGroup.value;
    let data = {
      name:formdata.name,
      email: formdata.email,
      contactNumber:formdata.contactNumber,
      password: formdata.password
    }

    this.authservice.signup(data).subscribe((response:any)=>{

      this.isLoading = false;
     
      console.log(response);
      this.responseMessage = response?.message;
      this.globalSnackbar.showSuccess(this.responseMessage,"close");

      // this.onSignIn();
    },(error)=>{
        this.isLoading = false;
        if(error.error?.message){
          this.responseMessage = error.error?.message;
        }
        else{
          this.responseMessage = GlobalConstants.genericError;
        }
        
        this.globalSnackbar.showError(this.responseMessage,GlobalConstants.error);
    })
}

}
