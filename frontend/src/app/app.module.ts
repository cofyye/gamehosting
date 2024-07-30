import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FeaturesModule } from './features/features.module';
import { HttpRequestInterceptor } from './shared/interceptors/http-request.interceptor';
import { ErrorHandlingInterceptor } from './shared/interceptors/error-handling.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appReducer } from './app.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([]),
    FeaturesModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (primeConfig: PrimeNGConfig) => () => {
        primeConfig.ripple = true;
      },
      deps: [PrimeNGConfig],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
