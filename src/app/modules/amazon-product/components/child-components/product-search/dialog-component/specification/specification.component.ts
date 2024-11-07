import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef, } from '@angular/material/dialog';

@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrl: './specification.component.scss'
})
export class SpecificationComponent {

  // product_feature_data!:data.product_features[];
  // specification: Specification = {}


  productFeatures: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { product_features: any }, private ref: MatDialogRef<SpecificationComponent>) {
    //  console.log(data.product_features);
    //  console.log(typeof(data.product_features));
    // this.productFeatures =this.removeUnderscores(data.product_features)
    // console.log(this.productFeatures);



    // // this.productFeatures = this.data.product_features.map((feature:any) => this.removeUnderscores(feature));
    let productFeaturesArray;

    if (typeof data.product_features === 'object' && !Array.isArray(data.product_features)) {
      // Convert object keys to an array
      // Convert object into an array of key-value pairs, removing underscores from keys
      productFeaturesArray = Object.entries(data.product_features).map(([key, value]) => ({
        key: key.replace(/_/g, ' '), // Replace underscores with spaces
        value
      }));
    }

    this.productFeatures = productFeaturesArray;
    console.log(this.productFeatures);
  }


  removeUnderscores(obj: any): any {
    const newObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = key.replace(/_/g, ' '); // Replace underscores with spaces in key
        newObj[newKey] = obj[key];
      }
    }
    return newObj;
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  closepopup() {
    this.ref.close()
  }

}
