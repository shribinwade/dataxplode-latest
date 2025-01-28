import { Component, Input } from '@angular/core';
import { startup } from '../startups-method/startups-method.component';

export interface Paynescore {
  rows: Row[];
  average: number;
  valuation: number;
}

export interface Row {
  parameter: string;
  value: number;
  adjustment: number;
  result: number;
}

const DEFAULT_ROWS: Row[] = [
  {
    parameter:
      'How experienced are the founders, single founder team? Management Team',
    value: 0,
    adjustment: 0,
    result: 0,
  },
  {
    parameter: 'Is the market ready yet – too late / too early? Opportunity Size',
    value: 0,
    adjustment: 0,
    result: 0,
  },
  {
    parameter: 'Target market, first mover? Scalability? Product / Technology',
    value: 0,
    adjustment: 0,
    result: 0,
  },
  {
    parameter: 'Easy to copy? Barriers to entry? IP? Competitive Environment',
    value: 0,
    adjustment: 0,
    result: 0,
  },
  {
    parameter:
      'How many competitors? Their strength? Marketing/Sales Channels/Partnerships',
    value: 0,
    adjustment: 0,
    result: 0,
  },
  {
    parameter: 'Go-to-market strategy, sales contracts signed? Other',
    value: 0,
    adjustment: 0,
    result: 0,
  },
  {
    parameter: 'Hiring capabilities, Access to funds, etc.',
    value: 0,
    adjustment: 0,
    result: 0,
  },
];

@Component({
  selector: 'app-paynescore-method',
  templateUrl: './paynescore-method.component.html',
  styleUrls: ['./paynescore-method.component.scss'],
})
export class PaynescoreMethodComponent {
  @Input() name = '';
  @Input() data: Paynescore = {rows: [...DEFAULT_ROWS],average: 0,valuation: 0};
  @Input() startupData!: startup;

  PessimisticValue = 0;

  get rows(): Row[] {
    return this.data.rows;
  }

  // Calculate the result for a specific row
  calculateResult(index: number): void {
    const row = this.rows[index];
    row.result = ((row.value || 0) * (row.adjustment || 0)) / 10000;
    this.updateData();
  }

  // Calculate the total weight (sum of all values)
  calculateWeight(): number {
    return this.rows.reduce((sum, row) => sum + (row.value || 0), 0);
  }

  // Calculate the average of the "result" column
  calculateAverage(): number {
    const total = this.rows.reduce((sum, row) => sum + (row.result || 0), 0);
    this.data.average = total / this.rows.length || 0;
    this.updateData();
    return this.data.average;
  }

  // Calculate valuation based on average and pessimistic value
  calculateValuation(): number {
    const avg = this.calculateAverage();
    const pessimisticValue = this.startupData?.pessimistic || 0;
    this.PessimisticValue = avg + pessimisticValue;
    this.data.valuation = this.PessimisticValue;
    return this.data.valuation;
  }

  // Sync data with parent
  updateData(): void {
    if (!this.data) {
      console.error('Data is undefined, cannot update.');
      return;
    }
    this.data.rows = this.rows;
  }
}