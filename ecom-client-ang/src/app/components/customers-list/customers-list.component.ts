import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customers-list',
  standalone: false,
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css'
})
export class CustomersListComponent implements OnInit {
  customers: Customer[] = [];
  newCustomer: Customer = { name: '', email: '' };
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  onAddCustomer(): void {
    if (!this.newCustomer.name || !this.newCustomer.email) return;

    this.customerService.createCustomer(this.newCustomer).subscribe({
      next: () => {
        this.newCustomer = { name: '', email: '' };
        this.loadCustomers();
      },
      error: (err) => this.errorMessage = 'Failed to add customer.'
    });
  }

  onDeleteCustomer(id: number | undefined): void {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this customer?')) return;

    this.customerService.deleteCustomer(id).subscribe({
      next: () => this.loadCustomers(),
      error: (err) => this.errorMessage = 'Failed to delete customer.'
    });
  }
  loadCustomers(): void {
    this.isLoading = true;
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Could not load customers. Is the gateway running?';
        this.isLoading = false;
      }
    });
  }
}
