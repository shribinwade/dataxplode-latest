import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {

    @Input() country!: string; // Country input property
    @Input() platform!: string;

    displayedColumns: string[] = ['platform', 'platformId', 'country', 'locationName', 'locationId', 'pincode'];
    dataSource: any[] = [];
  
    constructor() {}
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['platform'] || changes['country']) {
        this.updateDataSource();
      }
    }
  
    private updateDataSource(): void {
      if (this.platform && this.country) {
        this.dataSource = [
          {
            platform: this.platform,
            platformId: 'AMZ001',
            country: this.country,
            locationName: 'Pune',
            locationId: 'LOC123',
            pincode: '411018',
          },
          {
            platform: this.platform,
            platformId: 'AMZ002',
            country: this.country,
            locationName: 'Bangalore',
            locationId: 'LOC456',
            pincode: '560001',
          },
          {
            platform: this.platform,
            platformId: 'AMZ003',
            country: this.country,
            locationName: 'Pune',
            locationId: 'LOC789',
            pincode: '411016',
          },
        ];
      }
    }

}
