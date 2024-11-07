import { Component, Input, OnInit } from '@angular/core';
import { Brand, brandData, ItabComponent, marketSearch } from '../../../../../../../core/model/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { ShowModalService } from '../../../../../../../core/services/showModalService/show-modal.service';
import { ExportTableAsExcelService } from '../../../../../../../core/services/excel-utils/export-table-as-excel.service';

@Component({
  selector: 'app-market-leader',
  templateUrl: './market-leader.component.html',
  styleUrl: './market-leader.component.scss'
})
export class MarketLeaderComponent implements ItabComponent,OnInit {
  
  @Input() IsActive: boolean = true;
  @Input('data') data:any;

  displayedColumns: string[] = ['index','name','company','segment','marketShare','MarketGrouthRate','bcgValue'];

  dataSource= new MatTableDataSource<Brand>();
  marketLeaderData!: marketSearch;
  hiddendata:boolean = true;
  tableData!:any;

  constructor(private showModalService:ShowModalService,private  exportToExcelService:ExportTableAsExcelService){

  }

  CanClose(): boolean {
   return true
  }

  ngOnInit(): void {
    this.marketLeaderData = this.data;
       console.log(this.data); 
       
    if (this.marketLeaderData && this.marketLeaderData.Brand_list.length > 0) {
        this.tableData = this.transformData(this.marketLeaderData.Brand_list);
        this.dataSource = new MatTableDataSource<Brand>(this.tableData);
        this.hiddendata = false; // Show the table if data is available
    }   
  }
  
    //BCG Matrix dialog component
    handleBCGMatrixAction(): void {
      this.showModalService.showBCGModel(this.data);
    }


  private transformData(brandList: brandData[]): Brand[] {
    return brandList.map((Brand, index) => {
      const [brand] = Brand.Brand.split(' - ');
      const company = Brand.Company;
      const segment = Brand.Segment;
      const marketShare = Brand.market_share;
      const MarketGrouthRate = Brand.Market_Growth_Rate;
      const bcgValue = Brand.bcg_value;
    
      const cleanName = brand.replace(/^\d+\.\s*/, ''); // Remove leading number and period
      
      return { index: index + 1, brand:cleanName, company ,segment,marketShare,MarketGrouthRate,bcgValue};
    });
  }


  exportToExcel(){
    this.exportToExcelService.exportTableAsExcel(this.tableData,"Market Leader List")
  }




}
