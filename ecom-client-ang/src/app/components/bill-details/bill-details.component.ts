import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bill } from '../../models/bill.model';
import { BillingService } from '../../services/billing.service';

@Component({
  selector: 'app-bill-details',
  standalone: false,
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent implements OnInit {
  bill?: Bill;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private billingService: BillingService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadBillDetails(id);
    }
  }

  loadBillDetails(id: number): void {
    this.isLoading = true;
    this.billingService.getBillDetails(id).subscribe({
      next: (data) => {
        this.bill = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Could not load bill details.';
        this.isLoading = false;
      }
    });
  }

  getTotal(): number {
    if (!this.bill || !this.bill.productsItems) return 0;
    return this.bill.productsItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
}
