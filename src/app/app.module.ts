import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import {AuthGuard} from './guards/auth.guard';
import {AuthService} from './services/auth.service';
import { HeaderDirective } from './directives/header.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderDirective
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    AuthGuard,
    AuthService,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [
    AppComponent
  ],
  exports: [
    HeaderDirective
  ]
})
export class AppModule {}
