import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutComponent } from './pages/top-and-side-layout/layout/layout.component';
import { CustomSidenavComponent } from './pages/top-and-side-layout/custom-sidenav/custom-sidenav.component';
import { MenuItemComponent } from './pages/top-and-side-layout/menu-item/menu-item.component';
import { AuthService } from './core/services/auth-service/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { CacheInterceptor } from './core/interceptors/cache-interceptors/cache.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PricingComponent } from './pages/pricing/pricing/pricing.component';
import { AboutUsComponent } from './pages/about-us/about-us/about-us.component';
import { provideRouter, withDebugTracing,RouteReuseStrategy} from '@angular/router';
import {routes} from './app-routing.module'; 
import { ReuseRouter } from './core/services/reuse-router.service.ts/reuse-router.service';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    CustomSidenavComponent,
    MenuItemComponent,
    PricingComponent,
    AboutUsComponent
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          console.log(localStorage.getItem('token'));
          return localStorage.getItem('token') || sessionStorage.getItem('token');
        },
        allowedDomains: [ 
          "dataxplode.com",
                         "www.dataxplode.com",
                         "localhost:8081",
                         "localhost:9091"],
        // Your backend domain
        disallowedRoutes: [
          'localhost:8081/user/forgotPassword', 
          'localhost:8081/user/resetPassword',
          'localhost:8081/user/login'
        ]
      }
    }),
    BrowserAnimationsModule, 
  ],
  providers: [
    provideAnimationsAsync(),
    provideRouter(
      routes,
      // withDebugTracing(),
    ),

    {
        provide: RouteReuseStrategy,
        useClass: ReuseRouter

    },

    AuthService,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: CacheInterceptor, 
      multi:true
    },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
