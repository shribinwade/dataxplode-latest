import { Component, Input, OnInit } from '@angular/core';
import { BuyerPower } from '../../../../../../../core/model/interfaces';

@Component({
  selector: 'app-customer-power',
  templateUrl: './customer-power.component.html',
  styleUrl: './customer-power.component.scss'
})
export class CustomerPowerComponent implements OnInit {


  pageHidden: boolean = true;

  ConsumerPowerData!: BuyerPower[];

  switchCost!: BuyerPower;

  priceSensitivity!: BuyerPower;
  // FixedCostValue:string | undefined;

  purchaseSize?: BuyerPower;
  purchaseSizeData: string[] | undefined;

  @Input('data') data: any;

  ngOnInit(): void {

    if (this.data != undefined || null) {
      this.pageHidden = false;
      //Getting Buyers data
      this.ConsumerPowerData = this.data.Buyer_power;

      this.switchCost = this.ConsumerPowerData[0];
      this.priceSensitivity = this.ConsumerPowerData[1];


      this.purchaseSize = this.ConsumerPowerData[2];

      this.purchaseSizeData = this.purchaseSize.purchase_size;
    }
  }

  get formattedpurchaseSizeData(): string | undefined {
    return this.purchaseSizeData?.join('\n\n');
  }

}
