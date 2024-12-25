import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-review-search-table',
  templateUrl: './review-search-table.component.html',
  styleUrl: './review-search-table.component.scss'
})
export class ReviewSearchTableComponent {

  @Input() country!: string; // Country input property
  @Input() platform!: string; // Platform input property

  displayedColumns: string[] = ['platform', 'platformId', 'webpid', 'country'];
  dataSource: any[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['platform'] || changes['country']) {
      this.updateDataSource();
    }
  }

  ngOnInit(): void {
    this.updateDataSource();
  }

  private updateDataSource(): void {
    if (this.platform && this.country) {
      this.dataSource = [
        {
          platform: this.platform,
          platformId: 'AMZ001',
          webpid: 'WEB001',
          country: this.country,
        },
        {
          platform: this.platform,
          platformId: 'AMZ001',
          webpid: 'WEB002',
          country: this.country,
        },
        {
          platform: this.platform,
          platformId: 'AMZ001',
          webpid: 'WEB003',
          country: this.country,
        },
      ];
    }
  }

}
