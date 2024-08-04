import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FeaturesModule } from './features/features.module';
import { httpRequestInterceptor } from './shared/interceptors/http-request.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appReducer } from './app.state';
import { ToasterComponent } from './shared/components/toaster/toaster.component';
import { ToasterService } from './shared/services/toaster.service';
import { NotFoundModule } from './not-found/not-found.module';
import { HomeModule } from './home/home.module';
import { AuthEffects } from './shared/stores/auth/auth.effects';
import { LocationEffects } from './shared/stores/location/location.effects';

@NgModule({
  declarations: [AppComponent, ToasterComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects, LocationEffects]),
    StoreDevtoolsModule.instrument(),
    FeaturesModule,
    NotFoundModule,
    HomeModule,
  ],
  providers: [
    ToasterService,
    provideHttpClient(withInterceptors([httpRequestInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
