import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShowModalService } from '../../../../../../core/services/showModalService/show-modal.service';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';
import { Features } from '../../../../../../core/model/interfaces';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AmazonProductService } from '../../../../../../core/services/amazon-product/amazon-product.service';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-competitor-analysis',
  templateUrl: './competitor-analysis.component.html',
  styleUrl: './competitor-analysis.component.scss'
})
export class CompetitorAnalysisComponent implements OnInit {


  @Input('country') country:any;
  @Output() responseData = new EventEmitter<any>();
  @Output() formData = new EventEmitter<any>();

  features: Features[] = [];
  checkoutForm:any =FormGroup;
  searchData: any[] = [];
  isLoading:boolean = false;
  
  constructor(
    private showModalService:ShowModalService, 
    private formBuilder:FormBuilder,
    private amazonProductService: AmazonProductService
  ){}
  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      Keyword:['',Validators.required],
      ProductName:'',
      Mrp:'',
      Sp:'',
      ProductDescription:'',
      Brand:['',Validators.required],
      features:[this.features,Validators.required],
      Image:''
     });
  }
       // Method to check if a form control has the required validator
  isRequired(controlName: string): boolean {
        const control: AbstractControl | null = this.checkoutForm.get(controlName);
        return control?.hasValidator(Validators.required) ?? false;
  }

  onSubmit() {
    debugger
        /////////////////////////////////////////////
        this.isLoading = true;
        const formdata = this.checkoutForm.value;

        const formdatajson= JSON.stringify(formdata);
        console.log(formdatajson);
        

        let apiCall$;
    
        apiCall$ = this.amazonProductService.competitor_analysis_search(formdata,this.country);
          apiCall$.pipe(
            finalize(() => {
              //Stoping Loading after complete response
              this.isLoading=false;
            })
          ).subscribe((responseData:any)=>{
            debugger
            this.searchData = responseData;
            console.log(this.searchData);
            this.responseData.emit(responseData);
            this.formData.emit(this.checkoutForm);
            this.closeModal('cancel');
          },error =>{
            this.isLoading=false;
          })     
  }

  closeModal(returnOption: string){
    this.showModalService.modalContainer.clear();
    this.showModalService.selectedOptionObservable.next(returnOption);
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.features.push({feature: value});
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  remove(feature: Features): void {
    const index = this.features.indexOf(feature);
    if (index >= 0) {
      this.features.splice(index, 1);
    }
  }

  edit(feature: Features, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(feature);
      return;
    }
    // Edit existing feature
    const index = this.features.indexOf(feature);
    if (index >= 0) {
      this.features[index].feature = value;
    }
  }


}
