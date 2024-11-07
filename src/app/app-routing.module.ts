import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './shared/components/LandingPage/home/home.component';
import { LayoutComponent } from './pages/top-and-side-layout/layout/layout.component';


import { LoginComponent } from './modules/auth/auth-components/login/login.component';
import { SignupComponent } from './modules/auth/auth-components/signup/signup.component';
import { AuthGuardService } from './modules/auth/auth-guard/auth-guard.service';
import { PricingComponent } from './pages/pricing/pricing/pricing.component';
import { AboutUsComponent } from './pages/about-us/about-us/about-us.component';
import { AdminGuard } from './modules/auth/auth-admin-guard/auth-admin-guard.guard';

const routes: Routes = [
  
  {
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },

  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate:[AuthGuardService],
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
        canActivate:[AdminGuard]
      },
      {
        path: 'user',
        loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
      },
      // {
      //   path: 'amazon-product',
      //   loadChildren: () => import('./modules/amazon-product/amazon-product.module').then(m =>m.AmazonProductModule),
      // }
    ]
  },

  {
    path: 'home',
    component: HomeComponent
  },
 
  {
      path: 'pricing',
      component: PricingComponent
  },

  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'about-us',
    component: AboutUsComponent
  }
   
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
