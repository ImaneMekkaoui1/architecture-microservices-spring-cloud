import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-products-list',
  standalone: false,
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = { name: '', price: 0, quantity: 0 };
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  onAddProduct(): void {
    if (!this.newProduct.name || this.newProduct.price <= 0) return;

    this.inventoryService.createProduct(this.newProduct).subscribe({
      next: () => {
        this.newProduct = { name: '', price: 0, quantity: 0 };
        this.loadProducts();
      },
      error: (err) => this.errorMessage = 'Failed to add product.'
    });
  }

  onDeleteProduct(id: number | undefined): void {
    if (!id) return;
    this.inventoryService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: (err) => this.errorMessage = 'Failed to delete product.'
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    this.inventoryService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Could not load products. Is the gateway running?';
        this.isLoading = false;
      }
    });
  }

}
