import { Component, Input, OnInit } from '@angular/core';
import { CompetitorRivial, Root } from '../../../../../../../core/model/interfaces';

@Component({
  selector: 'app-competitor-rivals',
  templateUrl: './competitor-rivals.component.html',
  styleUrl: './competitor-rivals.component.scss'
})
export class CompetitorRivalsComponent implements OnInit {



  @Input('data') data!:Root;

  pageHidden:boolean= true;

  CompetitorRivalData!: CompetitorRivial[];
  
  IndustryGrowth!:CompetitorRivial;

  FixedCost!:CompetitorRivial;
  FixedCostValue:string | undefined;

  ExitBarriers?:CompetitorRivial;
  ExitBarriersData:string[] | undefined;

  ngOnInit(): void {
  
    if(this.data != undefined||null){
      this.pageHidden = !this.pageHidden;
      this.CompetitorRivalData = this.data.competitor_rivials;

      this.IndustryGrowth = this.CompetitorRivalData[0];
      this.FixedCost = this.CompetitorRivalData[1];
      this.FixedCostValue = this.FixedCost.Fixed_Cost;
   
      this.ExitBarriers = this.CompetitorRivalData[2];
   
      this.ExitBarriersData = this.ExitBarriers.Exit_Barriers;
    }

  }

  get formattedExitBarriers(): string | undefined {
    return this.ExitBarriersData?.join('\n\n');
  }

}
