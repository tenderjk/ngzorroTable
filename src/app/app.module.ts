import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { AddDataModalComponent } from './table/add-data-modal/add-data-modal.component';
// import {  } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    AddDataModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents:[AddDataModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
