import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalConstants } from '../../../../core/constants/global-constants';
import { AuthService } from '../../../../core/services/auth-service/auth.service';
import { CustomSnackbarService } from '../../../../core/services/snackbar-service/custom-snackbar.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {

  isLoading = false;

  ResetPasswordForm:any=FormGroup;
  responseMessage:any;

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private globalSnackbar:CustomSnackbarService
  ){

  }
  ngOnInit(): void {
    this.ResetPasswordForm = this.formBuilder.group({
      email: [null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
    })
  }

  handleSubmit(){

    this.isLoading = true;
    const formdata=this.ResetPasswordForm.value;

    let data = {
      email: formdata.email,
    }

    this.authService.forgotPassword(data).subscribe((response:any)=>{
      this.isLoading = false;
      
      this.responseMessage = response?.message;
      this.globalSnackbar.showSuccess(this.responseMessage,"Close");
    },(error)=>{

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


