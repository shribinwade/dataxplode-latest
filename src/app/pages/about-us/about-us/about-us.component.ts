import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements AfterViewInit {

  constructor(private router:Router,){

  }
  ngAfterViewInit(): void {
    this.initializeSpinner();
  }

  PricingPage(){
    this.router.navigate(['pricing']);
  }
  
  private initializeSpinner(): void {
    setTimeout(() => {
      const spinnerElement = document.getElementById('spinner');
      if (spinnerElement) {
        spinnerElement.classList.remove('show');
      }
    }, 500);
  }

}
