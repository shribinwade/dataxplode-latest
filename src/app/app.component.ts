import { Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';

import { ShowModalService } from './core/services/showModalService/show-modal.service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { routeAnimationState } from './shared/animations/route-animation/route-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations:[
    routeAnimationState
  ]
})
export class AppComponent {

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  @ViewChild('modal', {read:ViewContainerRef, static: false }) containerRef!: ViewContainerRef;

  constructor(private showModalService:ShowModalService, protected route:ActivatedRoute) {}

  ngAfterViewInit() {
    this.showModalService.modalContainer = this.containerRef;
  }
  title = 'DataXplode';

}
