import { trigger, transition, style, animate, query, group } from '@angular/animations';

export const routeAnimationState = trigger('routeAnimationTrigger', [
  transition('Login <=> Signup', [
    query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
    group([
      query(':leave', [
        animate('600ms ease', style({ transform: 'translateX(-100%)',opacity: 0  }))
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('600ms ease', style({ transform: 'translateX(0)',opacity: 1 }))
      ], { optional: true })
    ])
  ])
]);