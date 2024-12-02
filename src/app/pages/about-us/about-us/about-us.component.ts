import { AfterViewInit, Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { routeAnimationState } from '../../../shared/animations/route-animation/route-animation';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
  animations:[routeAnimationState]
})
export class AboutUsComponent implements AfterViewInit {

  @HostBinding('@routeAnimationTrigger') routeAnimation = true;

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
