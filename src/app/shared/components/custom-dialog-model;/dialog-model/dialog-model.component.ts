import { Component, Input, OnInit } from '@angular/core';
import { ShowModalService } from '../../../../core/services/showModalService/show-modal.service';


@Component({
  selector: 'app-dialog-model',
  templateUrl: './dialog-model.component.html',
  styleUrl: './dialog-model.component.scss'
})
export class DialogModelComponent implements OnInit {
  
  @Input() message: string = '';
  Title: string = 'Confirmation';
  constructor(private showModalService:ShowModalService ) {}


  ngOnInit(): void {
    // const elementRef = this.appRootRedService.getElementRef();
    // console.log(elementRef.nativeElement); // Access the element
  }
  closeModal(returnOption: string){
      this.showModalService.modalContainer.clear();
      this.showModalService.selectedOptionObservable.next(returnOption);
  }

}
