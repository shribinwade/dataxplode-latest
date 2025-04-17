import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConstants } from '../../../../core/constants/global-constants';
import { AuthService } from '../../../../core/services/auth-service/auth.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomSnackbarService } from '../../../../core/services/snackbar-service/custom-snackbar.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent implements OnInit {

  ResetPasswordFormGroup:any  = FormGroup;

  token: string = '';

  isLoading = false;
  hide = true;
  password = true;
  confirmPassword = true;
  responseMessage:any;


  constructor(
    private formBuilder: FormBuilder, 
    private authservice: AuthService,
    private http: HttpClient,
    private globalSnackbar:CustomSnackbarService,
    private router: Router,
    private route: ActivatedRoute,){

  }
  ngOnInit(): void {

    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    
  
    

    this.ResetPasswordFormGroup = this.formBuilder.group({
        newPassword: [null,[Validators.required,Validators.pattern(GlobalConstants.passwordRegex)]],
        confirmPassword:[null,[Validators.required,Validators.pattern(GlobalConstants.confirmpasswordRegex)]],
      })
  }


  validateSubmit(){
    if(this.ResetPasswordFormGroup.controls['newPassword'].value != this.ResetPasswordFormGroup.controls['confirmPassword'].value){
    return true;
    }
    else{
      return false;
    }
  }

  resetSubmit(){
    
     debugger
    if (this.ResetPasswordFormGroup.valid && this.token) {
      this.isLoading = true;
      const data = {
        token: this.token,
        newPassword: this.ResetPasswordFormGroup.value.newPassword
      };

      this.authservice.resetPssword(data).subscribe((response:any)=>{
        debugger
        this.isLoading = false;
        this.responseMessage = response?.message;
        this.globalSnackbar.showSuccess(this.responseMessage,"Close");
  
      },(error)=>{
        debugger
        this.isLoading = false;
        if(error.error?.message){
          this.responseMessage = error.error?.message;
        }
        else{
          this.responseMessage = GlobalConstants.genericError;
        }
  
        this.globalSnackbar.showError(this.responseMessage,GlobalConstants.error);
      })}  

  }
 

  onReset() {
    this.ResetPasswordFormGroup.reset(); // Reset the form
    this.isLoading = false;  // Reset loading state, just in case
  }
  

}
