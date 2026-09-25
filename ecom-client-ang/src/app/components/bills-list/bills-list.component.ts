import { Component, OnInit } from '@angular/core';
import { Bill } from '../../models/bill.model';
import { Customer } from '../../models/customer.model';
import { Product } from '../../models/product.model';
import { BillingService, BillItemRequest } from '../../services/billing.service';
import { CustomerService } from '../../services/customer.service';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-bills-list',
  standalone:false,
  templateUrl: './bills-list.component.html',
  styleUrls: ['./bills-list.component.css']
})
export class BillsListComponent implements OnInit {
  bills: Bill[] = [];
  customers: Customer[] = [];
  products: Product[] = [];

  errorMessage: string = '';
  isLoading: boolean = false;

  selectedCustomerId?: number;
  items: BillItemRequest[] = [{ productId: 0, quantity: 1 }];

  constructor(
    private billingService: BillingService,
    private customerService: CustomerService,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.loadBills();
    this.customerService.getCustomers().subscribe({ next: (data) => this.customers = data });
    this.inventoryService.getProducts().subscribe({ next: (data) => this.products = data });
  }

  loadBills(): void {
    this.isLoading = true;
    this.billingService.getBills().subscribe({
      next: (data) => {
        this.bills = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Could not load bills. Is the gateway running?';
        this.isLoading = false;
      }
    });
  }

  addItemRow(): void {
    this.items.push({ productId: 0, quantity: 1 });
  }

  removeItemRow(index: number): void {
    this.items.splice(index, 1);
  }

  onCreateBill(): void {
    if (!this.selectedCustomerId) {
      this.errorMessage = 'Please select a customer.';
      return;
    }
    const validItems = this.items.filter(i => i.productId && i.quantity > 0);
    if (validItems.length === 0) {
      this.errorMessage = 'Please add at least one valid product.';
      return;
    }

    this.billingService.createBill({
      customerId: this.selectedCustomerId,
      productItems: validItems
    }).subscribe({
      next: () => {
        this.selectedCustomerId = undefined;
        this.items = [{ productId: 0, quantity: 1 }];
        this.errorMessage = '';
        this.loadBills();
      },
      error: (err) => this.errorMessage = 'Failed to create bill.'
    });
  }
}
