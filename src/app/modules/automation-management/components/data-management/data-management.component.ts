import { Component, ElementRef, ViewChild } from '@angular/core';
import { ECommerceSitesService } from '../../../../core/services/e-commerce-sites/e-commerce-sites.service';
import { CustomSnackbarService } from '../../../../core/services/snackbar-service/custom-snackbar.service';
import { AuthService } from '../../../../core/services/auth-service/auth.service';
import { FormControl } from '@angular/forms';
import * as XLSX from 'xlsx';
import { ExcelToJsonService } from '../../../../core/services/excel-to-json-Utils/excel-to-json.service';
import { ExcelTemplateService } from '../../../../core/services/Excel-download-template/excel-template.service';

@Component({
  selector: 'app-data-management',
  templateUrl: './data-management.component.html',
  styleUrl: './data-management.component.scss',
})
export class DataManagementComponent {
  filteredSites: Array<{ id: number; name: string; src: string }> = [];
  selectedCountry = '';
  selectedPlatform = '';
  selectedService = '';
  selectedProductType = '';
  submitted = false;
  selectedCountrySites: any;
  ecommarcebrands: any;
  countryPlatforms: any;
  selectedtime: any;

  constructor(
    private ecommarcesites: ECommerceSitesService,
    private globalSnackbar: CustomSnackbarService,
    private excelTemplate: ExcelTemplateService
  ) {
    this.ecommarcebrands = ecommarcesites.eCommerceSites;
  }

  // ViewChild elements
  @ViewChild('country') country!: ElementRef;
  @ViewChild('picker') timePicker!: any;

  onSubmit(form: any) {
    if (form.valid) {
      this.submitted = true;
    }
    console.log(
      this.selectedCountry + this.selectedPlatform + this.selectedService
    );
  }

  onSelected(): void {
    this.selectedCountry = this.country.nativeElement.value;
    this.filterSites();
  }

  // Filter sites based on selected country
  filterSites() {
    if (this.selectedCountry) {
      //Getting Platforms based on country selection
      this.selectedCountrySites = this.ecommarcebrands.find(
        (site: any) => site.country === this.selectedCountry
      );
      this.filteredSites = this.selectedCountrySites
        ? this.selectedCountrySites.sites
        : [];

      //for City
      // this.selectedCities = this.selectedCountrySites ? this.selectedCountrySites.cities : [];
    } else {
      this.filteredSites = [];
    }
  }

  //Schedule Time
  formControlItem: FormControl = new FormControl('');

  onChange($event: Event): void {
    const scheduleTimeValue = this.formControlItem.value;
    this.selectedtime = scheduleTimeValue;
    console.log(scheduleTimeValue);
  }

  openFromIcon(timepicker: { open: () => void }) {
    if (!this.formControlItem.disabled) {
      timepicker.open();
    }
  }

  onClear($event: Event) {
    this.formControlItem.setValue(null);
  }

  //Download template excel
  downloadExcel(Service: string) {
      this.excelTemplate.downloadExcel(Service);
  }
}
