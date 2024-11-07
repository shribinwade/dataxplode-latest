import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CacheInterceptor } from './interceptors/cache-interceptors/cache.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [],
  
})
export class CoreModule { }
