import { Component, Input } from '@angular/core';
import { startup } from '../startups-method/startups-method.component';
import { Paynescore } from '../paynescore-method/paynescore-method.component';
import { berkus } from '../berkus-method/berkus-method.component';
import { Risksummation } from '../risk-summation-factor/risk-summation-factor.component';
import { discountedCashflow } from '../discounted-cashflow/discounted-cashflow.component';
import { ventureCapital } from '../venture-capital-method/venture-capital-method.component';
import { EarningMultiplier } from '../earning-multiplier-method/earning-multiplier-method.component';

export interface summarized {
  rows: Row[];
}

export interface Row {
  parameter: String;
  ms: number;
}

const DEFAULT_ROWS: Row[] = [
  { parameter: 'Payne Score Method', ms: 0 },
  { parameter: 'Berkus Method', ms: 0 },
  { parameter: 'Discounted CashFlow', ms: 0 },
  { parameter: 'Venture Capital Method', ms: 0 },
  { parameter: 'Earning Multiplier Method', ms: 0 },
];

@Component({
  selector: 'app-summarized-valuation',
  templateUrl: './summarized-valuation.component.html',
  styleUrl: './summarized-valuation.component.scss',
})
export class SummarizedValuationComponent {
  @Input() name: String = '';
  @Input() data: summarized = { rows: [...DEFAULT_ROWS] };
  @Input() startupData!: startup;
  @Input() paynescoreData!: Paynescore;
  @Input() berkusData!: berkus;
  @Input() riskSummation!: Risksummation;
  @Input() discountedCashFlow!: discountedCashflow;
  @Input() ventureCapital!: ventureCapital;
  @Input() earningMultiplier!: EarningMultiplier;

  constructor() {}

  ngOnInit(): void {
    // If data is passed from the parent, initialize rows with it
    console.log(this.startupData);
    console.log(this.paynescoreData);
    console.log(this.berkusData);
    console.log(this.riskSummation);
    console.log(this.discountedCashFlow);
    console.log(this.ventureCapital);
    console.log(this.earningMultiplier);
  }

  get rows(): Row[] {
    return this.data.rows;
  }

  // Sync data with parent
  updateData(): void {
    debugger;
    if (!this.data.rows) {
      console.error('Data is undefined, cannot update.');
      return;
    }

    if (this.data.rows) {
      this.data.rows[0].ms = this.paynescoreData?.valuation ?? 0;
      this.data.rows[1].ms = this.berkusData?.average ?? 0;
      this.data.rows[2].ms = this.discountedCashFlow?.averageIncome ?? 0;
      this.data.rows[3].ms = this.ventureCapital?.postMoney ?? 0; 
      this.data.rows[4].ms = this.earningMultiplier?.average ?? 0;
    }
    this.data.rows = this.rows;
  }

  // Method to calculate the average of the "result" column
  calculateMS(): number {
    const total = this.rows.reduce((avg, row) => avg + (row.ms || 0), 0);
    this.updateData();
    return total / this.rows.length;
  }
}
