import { Component, Input } from '@angular/core';

export interface EarningMultiplier {
  rows: Row[];
  average: number;
}

export interface Row {
  parameter: String;
  ms: number;
  result: number;
}

const DEFAULT_ROWS: Row[] = [
  { parameter: 'EBITDA', ms: 0, result: 0 },
  { parameter: 'EBITDA Multiple x', ms: 0, result: 0 },
];

@Component({
  selector: 'app-earning-multiplier-method',
  templateUrl: './earning-multiplier-method.component.html',
  styleUrl: './earning-multiplier-method.component.scss',
})
export class EarningMultiplierMethodComponent {
  @Input() name: String = '';
  @Input() data: EarningMultiplier = { rows: [...DEFAULT_ROWS], average: 0 };

  result!: number;

  constructor() {}

  get rows(): Row[] {
    return this.data.rows;
  }

  avarageValue = 0;
  // Sync data with parent
  updateData(): void {
    if (!this.data) {
      console.error('Data is undefined, cannot update.');
      return;
    }
    this.data.rows = this.rows;
    this.data.average = this.avarageValue;
  }

  // Method to calculate the average of the "result" column
  calculateMS(): number {
    const total = this.rows.reduce((sum, row) => sum + (row.ms || 0), 0);
    return total;
  }

  calculateResult() {
    if (this.rows.length === 0) {
      return 0; // Handle the case where rows are empty
    }

    const total = this.rows.reduce((product, row, index) => {
      // For the first iteration, use the row's value directly
      return index === 0 ? row.ms : product * row.ms;
    }, 1); // Start with 1 for multiplication logic
    this.avarageValue = total;
    this.updateData();
    return total;
  }
}
