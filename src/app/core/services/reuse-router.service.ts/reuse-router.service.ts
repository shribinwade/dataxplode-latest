import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, BaseRouteReuseStrategy, DetachedRouteHandle } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReuseRouter implements BaseRouteReuseStrategy {


  storedRouteHandles = new Map<String | undefined, DetachedRouteHandle>();


  shouldDetach(route: ActivatedRouteSnapshot): boolean {
      return route.data['reuse'] === true;
  }
  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
    if(route.data['reuse'])
      this.storedRouteHandles.set(route?.routeConfig?.path, detachedTree);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
     return this.storedRouteHandles.has(route?.routeConfig?.path);
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.storedRouteHandles.get(route?.routeConfig?.path) || null;
  }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.data['reuse'];
  }
}
