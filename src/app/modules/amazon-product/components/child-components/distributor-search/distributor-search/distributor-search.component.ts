import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Supplier_list, treadSupplier } from '../../../../../../../../../DataXplode/src/app/core/model/interfaces'
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExportTableAsExcelService } from '../../../../../../core/services/excel-utils/export-table-as-excel.service';
@Component({
  selector: 'app-distributor-search',
  templateUrl: './distributor-search.component.html',
  styleUrl: './distributor-search.component.scss'
})
export class DistributorSearchComponent implements OnChanges, OnInit, AfterViewInit, AfterViewInit {

  @Input('data') data: any;


  searchFormControl: any = FormGroup;
  searchLocationFormControl: any = FormGroup;
  porterSupplierData!: treadSupplier;
  suppliers: Supplier_list[] = [];

  public pageSlice = this.suppliers;
  displayedColumns: string[] = ['index', 'co_name', 'Address', 'default_mobile', 'default_email', 'business_type', 'catalog_url'];
  dataSource = new MatTableDataSource<Supplier_list>(this.pageSlice);



  //pagination variables
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = false;
  disabled = false;
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private formBuilder: FormBuilder,private  exportToExcelService:ExportTableAsExcelService ) { }


  ngOnInit(): void {
    debugger
    this.searchLocationFormControl = this.formBuilder.group({
      searchLocation: ['']
    })
    this.loadData();
  }



  loadData() {
    if (this.data && Array.isArray(this.data.Search_result)) {
      //showing pop up after result
      // Flatten Supplier_list arrays from all pages
      this.suppliers = this.data.Search_result.flatMap((page: any) => page.Supplier_list || []);
      this.updatePageSlice();
    }
    else {
      console.error('Search_result is not defined or not an array:');
    }
  }

  private updatePageSlice(): void {
    this.pageSlice = this.suppliers;
    this.dataSource.data = this.pageSlice;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  locationSearch() {
    const formvalue = this.searchLocationFormControl.get('searchLocation').value;
    // Apply the filter to the entire suppliers list
    const filteredSuppliers = this.suppliers.filter((supplier: Supplier_list) =>
      supplier.Address.toLowerCase().includes(formvalue)
    );
    this.dataSource.data = filteredSuppliers;
    this.dataSource.filter = formvalue.trim().toLowerCase();
  }

  getPageIndex(): number {
    return this.paginator ? this.paginator.pageIndex : 0;
  }

  getPageSize(): number {
    return this.paginator ? this.paginator.pageSize : 10;
  }

  clearSearchLocation() {
    this.pageSlice = this.suppliers.slice(0, 20);
    // this.dataSource.data = this.pageSlice;
    // Clear the form control
    this.searchLocationFormControl.get('searchLocation').setValue('');
    // Optionally, reset pagination
  }

  onPageChange(event: PageEvent): void {
    debugger
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pageSlice = this.suppliers.slice(startIndex, endIndex);

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.data);
  }

  exportToExcel(){
      this.exportToExcelService.exportTableAsExcel(this.suppliers,"Distributors List")
  }

}
