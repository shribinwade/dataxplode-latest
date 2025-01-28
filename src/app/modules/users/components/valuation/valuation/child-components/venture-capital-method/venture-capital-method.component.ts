import { Component, Input } from '@angular/core';

export interface ventureCapital {
  rows: Row[];
  preMoney:number;
  postMoney:number;
}

export interface Row {
  parameter: String,
  ms: number, 
  result: number 
}

const DEFAULT_ROWS: Row[] =  [
  { parameter: 'Anticipated Exit', ms: 0, result: 0 },
  { parameter: 'Target ROI', ms: 0, result: 0 },
  { parameter: 'Post Valuation', ms: 0, result: 0 },
  { parameter: 'Amount Investments', ms: 0, result: 0 },
  { parameter: 'Anticipated % of diluton', ms: 0, result: 0 },
  // { parameter: 'Pre-Money Valuation before adjusting', ms: 0, result: 0 },
  // { parameter: 'Pre-Money Valuation after adjusting', ms: 0, result: 0 },
]; 


@Component({
  selector: 'app-venture-capital-method',
  templateUrl: './venture-capital-method.component.html',
  styleUrl: './venture-capital-method.component.scss',
})
export class VentureCapitalMethodComponent {
  @Input() name: String = '';
  @Input() data: ventureCapital = { rows: [...DEFAULT_ROWS],preMoney:0,postMoney:0 }; 

  PreValueAfterAdj: number = 0;
  PostValueAfterAdj: number = 0;
  
  constructor() {}

  get rows(): Row[] {
    return this.data.rows;
  }

  updateData(): void {
    if (!this.data) {
      console.error('Data is undefined, cannot update.');
      return;
    }
    this.data.rows = this.rows;
    this.data.postMoney = this.PreValueAfterAdj;
    this.data.preMoney = this.PostValueAfterAdj
    // this.data.rows[5].ms = this.PreMoneyBefore();
    // this.data.rows[6].ms = this.PreMoneyAfter();
  }

  // Method to calculate the average of the "result" column
  calculateMS(): number {
    const total = this.rows.reduce((sum, row) => sum + (row.ms || 0), 0);
    return total;
  }

  PreMoneyBefore() :number{
   const result =  this.data.rows[2].ms - this.data.rows[3].ms; 
   this.PostValueAfterAdj = result;
   return result;
  }

  PreMoneyAfter():number{
   const result = this.PreMoneyBefore() * (1- (this.data.rows[4].ms/100) );
   this.PreValueAfterAdj = result;
   this.updateData();
   return result;
  }

  changedValue(index: number): void {
    this.updateData();
  }
}
