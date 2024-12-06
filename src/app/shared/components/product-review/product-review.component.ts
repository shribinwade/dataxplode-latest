import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';
import { AmazonProductService } from '../../../core/services/amazon-product/amazon-product.service';
import { CustomSnackbarService } from '../../../core/services/snackbar-service/custom-snackbar.service';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrl: './product-review.component.scss'
})
export class ProductReviewComponent implements OnInit, AfterViewInit {

  reviewCall$!: any;
  receviedData!: any;
  isLoadingReviews:boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { formdata: any },
    private amazonProductService: AmazonProductService,
    private globalSnackbar: CustomSnackbarService,
    private ref: MatDialogRef<ProductReviewComponent>, 
  ) { }

  private unsubscribe$ = new Subject<void>();

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
  
    const requestData = {
      country: this.data.formdata.country,
      productSearchQuery: this.data.formdata.productSearchQuery,
      keywordSearchQuery: this.data.formdata.keywordSearchQuery,
      marketSearchQuery: this.data.formdata.marketSearchQuery,
      pincode: this.data.formdata.pincode
    };
    
    this.reviewCall$ = this.amazonProductService.amazon_product_reviews(requestData);
    // console.log(this.data.formdata);
    this.callapi();
           
  }


  callapi() {
    this.isLoadingReviews=true;
    console.log("inside callapi loading review");

    this.reviewCall$.pipe(
      takeUntil(this.unsubscribe$),
      finalize(() => {
          //Stoping Loading after complete response
          this.isLoadingReviews=false;
        })
      ).subscribe((responseData: any) => {
       
      this.receviedData = responseData;
      console.log(this.receviedData);
    },(error:any) =>{

      this.isLoadingReviews=false;
      this.globalSnackbar.showError("No reviews Found for Product","Close");

    })
  }

  ngOnDestroy(): void {
    // Notify all subscriptions to complete
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  closepopup(): void {
    this.ref.close();
  }




}
