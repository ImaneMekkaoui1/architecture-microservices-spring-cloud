import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // DELETE this import
import { provideHttpClient } from '@angular/common/http'; // ADD this
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { BillsListComponent } from './components/bills-list/bills-list.component';
import { BillDetailsComponent } from './components/bill-details/bill-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersListComponent,
    ProductsListComponent,
    BillsListComponent,
    BillDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
