import { Component, Input } from '@angular/core';
export interface Risksummation{
  rows: Row[];
  avarageRating:number;
  avarageM:number;
}

export interface Row {
  parameter: string;
  value: number;
  ms: number;
  result: number;
}

const DEFAULT_ROWS: Row[] = [
  { parameter: 'Management Risk', value: 2, ms: 0.5, result: 0 },
  { parameter: 'Stage of business', value: 2, ms: 0.5, result: 0 },
  { parameter: 'Legislation / Political Risk',value: -1,ms: -0.25,result: 0},
  { parameter: 'Manufacturing Risk', value: 0, ms: 0, result: 0 },
  { parameter: 'Sales and Marketing Risk', value: -1, ms: -0.25, result: 0 },
  { parameter: 'Fund / Capital raising risk', value: 0, ms: 0, result: 0 },
  { parameter: 'Competition Risk', value: -2, ms: -0.5, result: 0 },
  { parameter: 'Technology Risk', value: -1, ms: -0.25, result: 0 },
  { parameter: 'Litigation Risk', value: 0, ms: 0, result: 0 },
  { parameter: 'International Risk', value: 0, ms: 0, result: 0 },
  { parameter: 'Reputation Risk', value: 0, ms: 0, result: 0 },
  { parameter: 'Exit Value Risk', value: 1, ms: 0.25, result: 0 },
];

@Component({
  selector: 'app-risk-summation-factor',
  templateUrl: './risk-summation-factor.component.html',
  styleUrl: './risk-summation-factor.component.scss',
})
export class RiskSummationFactorComponent {
  @Input() name: String = '';
  @Input() data: Risksummation = {rows: [...DEFAULT_ROWS],avarageRating: 0,avarageM: 0};;

  RiskSummationAvgMValue = 0;
  RiskSummationAvgRating = 0;

  get rows(): Row[] {
    return this.data.rows;
  }

  // Sync data with parent
  updateData(): void {
    if (!this.data) {
      console.error('Data is undefined, cannot update.');
      return;
    }
    this.data.rows = this.rows;
    this.data.avarageM = this.RiskSummationAvgMValue;
    this.data.avarageRating= this.RiskSummationAvgRating;
  }

  // Method to calculate the result for a specific row
  calculateResult(index: number): void {
    const row = this.rows[index];
    row.result = ((row.value || 0) * (row.ms || 0)) / 10000;
    this.updateData(); // Keep parent data in sync
  }

  calculateRatings(): number {
    const total = this.rows.reduce((sum, row) => sum + (row.value || 0), 0);
    this.RiskSummationAvgRating = total;
    return total;
  }

  // Method to calculate the average of the "result" column
  calculateMS(): number {
    const total = this.rows.reduce((sum, row) => sum + (row.ms || 0), 0);
    this.RiskSummationAvgMValue = total;
    return total;
  }
}
