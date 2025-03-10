import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackBarComponent } from '../../../shared/components/custom-snack-bar/custom-snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class CustomSnackbarService {

  constructor(private snackBar:MatSnackBar) { }
   
  showSuccess(
    message: string,
    action: string, 
    duration: number = 10000, 
    position: 'start' | 'center' | 'end' | 'left' | 'right' = 'right'  ){
    return this.snackBar.openFromComponent(CustomSnackBarComponent,{
      data: { message , action},
      duration: duration,
      horizontalPosition: position,
      verticalPosition: 'top',
      panelClass:['green-snackbar'],
    })
    
    // open(message,action,{
    //   panelClass:['green-snackbar'],
    //   horizontalPosition: 'right',   // Aligns the Snackbar to the right
    //   verticalPosition: 'top',       // Aligns the Snackbar to the top
    // });

  }

  showError(message: string,action: string, duration: number = 10000, position: 'start' | 'center' | 'end' | 'left' | 'right' = 'right' ){
    return this.snackBar.openFromComponent(CustomSnackBarComponent,{
      data: { message , action},
      duration: duration,
      horizontalPosition: position,
      verticalPosition: 'top',
      panelClass:['red-snackbar'],
    });
  }
}
