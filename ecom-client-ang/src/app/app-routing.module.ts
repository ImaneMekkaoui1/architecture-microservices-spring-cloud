import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { BillsListComponent } from './components/bills-list/bills-list.component';
import { BillDetailsComponent } from './components/bill-details/bill-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  { path: 'customers', component: CustomersListComponent },
  { path: 'products', component: ProductsListComponent },
  { path: 'bills', component: BillsListComponent },
  { path: 'bills/:id', component: BillDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
