import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { httpRequestInterceptor } from './shared/interceptors/http-request.interceptor';
import { errorHandlingInterceptor } from './shared/interceptors/error-handling.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToasterComponent } from './shared/components/toaster/toaster.component';
import { ToasterService } from './shared/services/toaster.service';
import { AuthService } from './shared/services/auth.service';
import { NotFoundModule } from './not-found/not-found.module';
import { HomeModule } from './home/home.module';
import { EffectsModule } from '@ngrx/effects';
import { loaderReducer } from './shared/stores/loader/loader.reducer';
import { environment } from '../environments/environment';
import { authReducer } from './shared/stores/auth/auth.reducer';
import { httpReducer } from './shared/stores/http/http.reducer';
import { AuthEffects } from './shared/stores/auth/auth.effects';

@NgModule({
  declarations: [AppComponent, ToasterComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({
      loader: loaderReducer,
      auth: authReducer,
      http: httpReducer,
    }),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.PRODUCTION,
    }),
    NotFoundModule,
    HomeModule,
  ],
  providers: [
    ToasterService,
    AuthService,
    provideHttpClient(
      withInterceptors([httpRequestInterceptor, errorHandlingInterceptor])
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
