import { Component, Input } from '@angular/core';

export interface discountedCashflow {
  rows: Row[];
  averageIncome: number;
  averageExpense: number;
  averageAssets: number;
  averageLiability: number;
  averageNetprofit: number;
  averageNoOfClients: number;
}

export interface Row {
  year: String;
  calender: number;
  income: number;
  expense: number;
  assets: number;
  liability: number;
  profit: number;
  clients: number;
  unitRate: number;
  clientLocation: String;
}

const DEFAULT_ROWS: Row[] = [
  {
    year: '',
    calender: 0,
    income: 0,
    expense: 0,
    assets: 0,
    liability: 0,
    profit: 0,
    clients: 0,
    unitRate: 0,
    clientLocation: '',
  },
  {
    year: '',
    calender: 0,
    income: 0,
    expense: 0,
    assets: 0,
    liability: 0,
    profit: 0,
    clients: 0,
    unitRate: 0,
    clientLocation: '',
  },
  {
    year: '',
    calender: 0,
    income: 0,
    expense: 0,
    assets: 0,
    liability: 0,
    profit: 0,
    clients: 0,
    unitRate: 0,
    clientLocation: '',
  },
  {
    year: '',
    calender: 0,
    income: 0,
    expense: 0,
    assets: 0,
    liability: 0,
    profit: 0,
    clients: 0,
    unitRate: 0,
    clientLocation: '',
  },
];

@Component({
  selector: 'app-discounted-cashflow',
  templateUrl: './discounted-cashflow.component.html',
  styleUrl: './discounted-cashflow.component.scss',
})
export class DiscountedCashflowComponent {
  @Input() name: String = '';
  @Input() data: discountedCashflow = {
    rows: [...DEFAULT_ROWS],
    averageExpense: 0,
    averageIncome: 0,
    averageAssets: 0,
    averageLiability: 0,
    averageNetprofit: 0,
    averageNoOfClients: 0,
  };

  constructor() {}

  avgIncome: number = 0;
  avgExpense: number = 0;
  avgAssets: number = 0;
  avgLiability: number = 0;
  avgNetprofit: number = 0;
  avgNoOfClients: number = 0;
  get rows(): Row[] {
    return this.data.rows;
  }

  // Update parent data when rows are modified
  updateData(): void {
    if (!this.data) {
      console.error('Data is undefined, cannot update.');
      return;
    }
    this.data.rows = this.rows;
    this.data.averageIncome = this.avgIncome;
    this.data.averageExpense = this.avgExpense;
    this.data.averageAssets = this.avgAssets;
    this.data.averageLiability = this.avgLiability;
    this.data.averageNetprofit = this.avgNetprofit;
    this.data.averageNoOfClients = this.avgNoOfClients;
  }

  calculateIncome(): number {
    const total = this.rows.reduce((sum, row) => sum + (row.income || 0), 0);
    this.avgIncome = total;
    this.updateData(); // Keep parent data in sync
    return total;
  }
  calculateExpense(): number {
    const total = this.rows.reduce((sum, row) => sum + (row.expense || 0), 0);
    this.avgExpense = total;
    this.updateData(); // Keep parent data in sync
    return total;
  }

  calculateAssets(): number {
    const total = this.rows.reduce((sum, row) => sum + (row.assets || 0), 0);
    this.avgAssets = total;
    this.updateData(); // Keep parent data in sync
    return total;
  }

  calculateLiability():number{
    const total = this.rows.reduce((sum, row) => sum + (row.liability || 0), 0);
    this.avgLiability = total;
    this.updateData(); // Keep parent data in sync
    return total;
  }

  
  calculateProfit():number{
    const total = this.rows.reduce((sum, row) => sum + (row.profit || 0), 0);
    this.avgNetprofit = total;
    this.updateData(); // Keep parent data in sync
    return total;
  }
  calculateClients():number{
    const total = this.rows.reduce((sum, row) => sum + (row.clients || 0), 0);
    this.avgNoOfClients = total;
    this.updateData(); // Keep parent data in sync
    return total;
  }

  changedValue(index: number): void {
    this.updateData();
  }

  addRow() {
    const obj = {
      year: '',
      calender: 0,
      income: 0,
      expense: 0,
      assets: 0,
      liability: 0,
      profit: 0,
      clients: 0,
      unitRate: 0,
      clientLocation: '',
    };
    this.rows.push(obj);
    this.updateData(); // Keep parent data in sync
  }
  deleteRow(x: any) {
    var delBtn = confirm(' Do you want to delete ?');
    if (delBtn == true) {
      this.rows.splice(x, 1);
      this.updateData(); // Keep parent data in sync
    }
  }
}
