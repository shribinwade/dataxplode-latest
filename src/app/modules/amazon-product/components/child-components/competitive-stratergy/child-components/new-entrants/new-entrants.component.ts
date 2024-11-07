import { Component, Input, OnInit } from '@angular/core';
import { BuyerPower, Difficulty, newEntrants, Opportunity } from '../../../../../../../core/model/interfaces';

@Component({
  selector: 'app-new-entrants',
  templateUrl: './new-entrants.component.html',
  styleUrl: './new-entrants.component.scss'
})
export class NewEntrantsComponent implements OnInit {

  pageHidden: boolean = true;

  ConsumerPowerData!: BuyerPower[];

  switchCost!:BuyerPower;

  priceSensitivity!:BuyerPower;
  // FixedCostValue:string | undefined;

  purchaseSize?:BuyerPower;
  purchaseSizeData:string[] | undefined;

  @Input('data') data:any;

  Entrans!: newEntrants[];
  Challenges!: Difficulty[];
  Opportunity!: Opportunity[];


  ngOnInit(): void {

    if(this.data != undefined || null){
    this.pageHidden = false;
    const dataen= this.data.portential_entrant;
    const data:newEntrants = JSON.parse(dataen);
    this.Challenges = data.difficulties;
    this.Opportunity = data.opportunities;
    }
  }
}
