import { Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';

import { ShowModalService } from './core/services/showModalService/show-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild('modal', {read:ViewContainerRef, static: false }) containerRef!: ViewContainerRef;

  constructor(private showModalService:ShowModalService) {}

  ngAfterViewInit() {
    this.showModalService.modalContainer = this.containerRef;
  }
  title = 'DataXplode';

}
