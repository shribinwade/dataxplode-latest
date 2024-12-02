import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanService } from '../../../core/services/Plan-Service/plan.service';
import { Plan } from '../../../core/model/interfaces';
import { routeAnimationState } from '../../../shared/animations/route-animation/route-animation';


@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
  animations:[routeAnimationState]
})
export class PricingComponent implements OnInit  {
 
  currentSelectedPlan:string = "free";

  planArray!:Plan[];

  selectedPlan?:Plan;

  spinnerVisible = true; // Initially visible

  constructor(private router:Router, private planService:PlanService){}

  ngOnInit(): void {
    this.planService.getAllPlan().subscribe(
      (response: any) =>{
        this.planArray = response;
      },
      (error: any) =>{

      }
     );
  }

  ngAfterViewInit(): void {

    this.toggleSpinner();
  }

  toggleSpinner(): void {

    setTimeout(() => {
      this.spinnerVisible = !this.spinnerVisible; // Toggle visibility
    }, 500);
    
  }

  AboutUsPage(){
    this.router.navigate(['about-us']);
  }
  
  // private initializeSpinner(): void {
  //   setTimeout(() => {
  //     const spinnerElement = document.getElementById('spinner');
  //     if(spinnerElement ) {
  //       spinnerElement.classList.remove('show');
  //     }
  //   }, 300);
  // }

  setSelectdPlan(planName:string){
     this.currentSelectedPlan = planName;
  }

  getselectedPlan(plan:Plan){
      this.selectedPlan = plan;
      console.log(plan);
  }

}
function HostBinding(arg0: string): (target: PricingComponent, propertyKey: "routeAnimation") => void {
  throw new Error('Function not implemented.');
}

