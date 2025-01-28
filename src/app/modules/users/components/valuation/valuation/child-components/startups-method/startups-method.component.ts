import { Component, Input } from '@angular/core';

export interface startup {
  rows: rows[];
  average: any;
  pessimistic: any;
}
export interface rows {
  startup: any;
  valuation: any;
  funds: any;
  location: any;
}

@Component({
  selector: 'app-startups-method',
  templateUrl: './startups-method.component.html',
  styleUrl: './startups-method.component.scss',
})

export class StartupsMethodComponent {
  @Input() name: String = '';
  @Input() data: startup = {
    rows: [
      { startup: '', valuation: 0, funds: '', location: '' },
      { startup: '', valuation: 0, funds: '', location: '' },
      { startup: '', valuation: 0, funds: '', location: '' },
      { startup: '', valuation: 0, funds: '', location: '' },
    ],
    average: 0,
    pessimistic: 0,
  };

  Pessimisticvalue: number = 0;
  averageValue: number = 0;

  rows = [
    { startup: '', valuation: 0, funds: '', location: '' },
    { startup: '', valuation: 0, funds: '', location: '' },
    { startup: '', valuation: 0, funds: '', location: '' },
    { startup: '', valuation: 0, funds: '', location: '' },
  ];

  constructor() {}

  ngOnInit(): void {
    // If data is passed from the parent, initialize rows with it
    if (this.data) {    
      this.rows = this.data.rows;
      this.averageValue = this.data.average;
      this.Pessimisticvalue = this.data.pessimistic;
    }
  }

  // Update parent data when rows are modified
  updateData(): void {
    if (!this.data) {
      console.error('Data is undefined, cannot update.');
      return;
    }
    this.data.rows = this.rows;
    this.data.pessimistic = this.Pessimisticvalue;
    this.data.average = this.averageValue;
  }

  calculateValuation(): number {
    const total = this.rows.reduce((sum, row) => sum + (row.valuation || 0), 0);
    this.averageValue = total;
    this.updateData();
    return total;
  }

  addRow() {
    const obj = {
      startup: '',
      valuation: 0,
      funds: '',
      location: '',
    };
    this.rows.push(obj);
    this.updateData();
  }
  deleteRow(x: any) {
    var delBtn = confirm(' Do you want to delete ?');
    if (delBtn == true) {
      this.rows.splice(x, 1);
      this.updateData();
    }
  }
}
