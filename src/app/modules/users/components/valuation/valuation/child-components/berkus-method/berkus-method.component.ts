import { Component, Input, OnInit } from '@angular/core';

export interface berkus {
  rows: Row[];
  average: number;
}

export interface Row {
  parameter: string;
  value: number;
  adjustment: number;
  result: number;
}

const DEFAULT_ROWS: Row[] = [
  {
    parameter: 'Unique Selling Proposition (USP)',
    value: 0,
    adjustment: 0,
    result: 0,
  },
  { parameter: 'Viable Beta', value: 0, adjustment: 0, result: 0 },
  {
    parameter: 'Quality Controls in Place',
    value: 0,
    adjustment: 0,
    result: 0,
  },
  {
    parameter: 'Partner Agreements Pre-Revenue',
    value: 0,
    adjustment: 0,
    result: 0,
  },
  { parameter: 'Post-Revenue Success', value: 0, adjustment: 0, result: 0 },
];

@Component({
  selector: 'app-berkus-method',
  templateUrl: './berkus-method.component.html',
  styleUrl: './berkus-method.component.scss',
})
export class BerkusMethodComponent  {
  @Input() name: String = '';
  @Input() data: berkus = { rows: [...DEFAULT_ROWS], average: 0 };

  avarageValue = 0;
  constructor() {}

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
    this.data.average = this.avarageValue;
  }

  // Method to calculate the result for a specific row
  calculateResult(index: number): void {
    const row = this.rows[index];
    row.result = ((row.value || 0) * (row.adjustment || 0)) / 100;
   
  }

  // Method to calculate the average of the "result" column
  calculateAverage(): number {
    const total = this.rows.reduce((sum, row) => sum + (row.result || 0), 0);
    this.avarageValue = total;
    this.updateData();
    return total;
  }
}
