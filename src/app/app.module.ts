import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePage } from './home/home.page';
import { I18nService } from './services/i18n.service';

@NgModule({
  declarations: [AppComponent, HomePage],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    IonicModule.forRoot({
      mode: 'md',
      animated: true,
    }),
    AppRoutingModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    I18nService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
