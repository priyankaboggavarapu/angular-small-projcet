import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GooglePlaceModule } from "angular2-google-place";
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import { AppComponent } from './app.component';

import { HomeComponent } from '../app/home/home.component';
import { HeaderComponent } from '../app/header/header.component';
import { CommonService } from './common.service';
import { AccademicComponent } from '../app/accademic/accademic.component';
import { FooterComponent } from '../app/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AccademicComponent,
    FooterComponent
  ],



  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    GooglePlaceModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'HeaderComponent', pathMatch: 'full' },

      { path: "academic", component: AccademicComponent }
      // {

      //   path: "header", component: HeaderComponent,
      //   children: [

      //   ]
      // }
    ])
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
