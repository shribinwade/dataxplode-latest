import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { DialogModelComponent } from '../../../shared/components/custom-dialog-model;/dialog-model/dialog-model.component';
import { Subject } from 'rxjs';
import { BcgMatrixChartComponent } from '../../../shared/components/BCG-dialog-model/bcg-matrix-chart/bcg-matrix-chart.component';
import { CompetitorAnalysisComponent } from '../../../modules/amazon-product/components/child-components/competitor-analysis/competitor-analysis/competitor-analysis.component';

@Injectable({
  providedIn: 'root'
})
export class ShowModalService {
  modalContainer!:ViewContainerRef;
  selectedOptionObservable = new Subject<string> ();

  //container ref for Competitor analysis
  componentRef !: ComponentRef<CompetitorAnalysisComponent>;

  constructor() { }
  
  showModal(message: string){
    this.modalContainer.clear();
    var component = this.modalContainer.createComponent(DialogModelComponent);
    component.instance.message = message;
    return this.selectedOptionObservable;
  }

  showBCGModel(data:any){
        this.modalContainer.clear();
        var component = this.modalContainer.createComponent(BcgMatrixChartComponent);
        component.instance.data = data;
        return this.selectedOptionObservable;
  }

  showCompetitorAnalysisModel(country:string){
       this.modalContainer.clear();
       this.componentRef = this.modalContainer.createComponent(CompetitorAnalysisComponent);
       this.componentRef.instance.country = country;
       this.componentRef.instance.responseData.subscribe((responseData)=>{
        console.log(responseData);
       })
       this.componentRef.instance.formData.subscribe((formData)=>{
        console.log(formData);
       })

       return this.selectedOptionObservable;
  }
}
