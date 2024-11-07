import { Component, Input, OnInit } from '@angular/core';
import { ShowModalService } from '../../../../core/services/showModalService/show-modal.service';
import { marketSearch } from '../../../../core/model/interfaces';

@Component({
  selector: 'app-bcg-matrix-chart',
  templateUrl: './bcg-matrix-chart.component.html',
  styleUrl: './bcg-matrix-chart.component.scss'
})
export class BcgMatrixChartComponent implements OnInit {


  @Input('data') data:any;
  brands!:marketSearch;

  constructor(private showModalService:ShowModalService ) {

  }

  ngOnInit(): void {
    this.brands = this.data;
  }




  closeModal(returnOption: string){
    this.showModalService.modalContainer.clear();
    this.showModalService.selectedOptionObservable.next(returnOption);
}

}
