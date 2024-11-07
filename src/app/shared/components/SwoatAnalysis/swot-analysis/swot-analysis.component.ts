import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';

import { AmazonProductService } from '../../../../core/services/amazon-product/amazon-product.service';

// Define the structure of the data (this should match your actual data structure)


@Component({
  selector: 'app-swot-analysis',
  templateUrl: './swot-analysis.component.html',
  styleUrl: './swot-analysis.component.scss'
})
export class SwotAnalysisComponent implements OnInit {
  
   
 
  categories = ['Strength', 'Weakness', 'Opportunity', 'Threat'];
  displayedColumns: string[] = ['Product', 'Strength', 'Weakness', 'Opportunity', 'Threat'];
  dataSource: any[] = [];

  isLoading:boolean=false;
  isHidden:boolean = true;

  swotanalysisCall$!:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public swotData: any, // Ensure the injected data matches the expected structure
    private amazonProductService: AmazonProductService,
    // private globalSnackbar: SnackbarService
  ) {}

  ngOnInit(): void {
  
    this.isLoading = true;
    this.swotanalysisCall$= this.amazonProductService.Post_get_swot_analyzer(this.swotData);
    
    this.swotanalysisCall$.pipe(
      finalize(() => {
        // Any finalization code here
        this.isLoading = false;
      })
    ).subscribe(
      (res:any) => {
          console.log(res);
          this.isLoading = false;
          this.isHidden = false;
        this.transformData(res); // Transform data for table display
      }, 
     (error:any) => {
        console.error('Error fetching SWOT analysis:', error);
        this.isLoading = false;
        this.isHidden = true;

        // const snackBarRef = this.globalSnackbar.showError('Something went wrong', 'Close');
      }
    );
  }

  private transformData(data: any): void {
    debugger
    this.dataSource = data.map((item: any) => {
      const productName = Object.keys(item)[0];


      const swotDetails = item[productName] || {};
      

      return {
        
        Product: productName,
        Strength: swotDetails.strength.length !=0 ? swotDetails.strength.join(', ') : 'N/A',
        Weakness: swotDetails.weakness.length !=0 ? swotDetails.weakness.join(', ') : 'N/A',
        Opportunity: swotDetails.opportunity.length !=0 ? swotDetails.opportunity.join(', ') : 'N/A',
        Threat: swotDetails.threat.length !=0 ? swotDetails.threat.join(', ') : 'N/A'
      };
    });
  }
  
}
