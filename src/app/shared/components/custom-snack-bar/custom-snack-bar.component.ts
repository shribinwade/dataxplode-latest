import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snack-bar',
  templateUrl: './custom-snack-bar.component.html',
  styleUrl: './custom-snack-bar.component.scss'
})
export class CustomSnackBarComponent {

  progress = 100;
  private currentIntervalId!: any;

  /** Data that was injected into the snack bar. */
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackBarRef: MatSnackBarRef<CustomSnackBarComponent>
  ) {
    this.snackBarRef.afterOpened().subscribe(
      () => {
        const duration:any = this.snackBarRef.containerInstance.snackBarConfig.duration;
        this.runProgressBar(duration);
      },
      error => console.error(error)
    );
  }

  dismissWithAction() {
    this.cleanProgressBarInterval();
    this.snackBarRef.dismissWithAction();
  }

  /**
  @param duration - in milliseconds
   */
  runProgressBar(duration: number) {
    this.progress = 100;
    const step = 0.005;
    this.cleanProgressBarInterval();
    this.currentIntervalId = setInterval(() => {
      this.progress -= 100 * step;
      if (this.progress < 0) {
        this.cleanProgressBarInterval();
      }
    }, duration * step);
  }

  cleanProgressBarInterval() {
    clearInterval(this.currentIntervalId);
  
  }

}
