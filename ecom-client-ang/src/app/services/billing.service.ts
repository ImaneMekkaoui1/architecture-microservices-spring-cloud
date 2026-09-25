import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Bill } from '../models/bill.model';
import { environment } from '../../environments/environment';

export interface BillItemRequest {
  productId: number;
  quantity: number;
}

export interface BillRequest {
  customerId: number;
  productItems: BillItemRequest[];
}

@Injectable({ providedIn: 'root' })
export class BillingService {
  private baseUrl = `${environment.gatewayUrl}/BILLING-SERVICE`;

  constructor(private http: HttpClient) {}

  getBills(): Observable<Bill[]> {
    return this.http.get<any>(`${this.baseUrl}/bills`).pipe(
      map(response => response._embedded ? response._embedded.bills : [])
    );
  }

  getBillDetails(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.baseUrl}/bills/${id}`);
  }

  createBill(request: BillRequest): Observable<Bill> {
    return this.http.post<Bill>(`${this.baseUrl}/bills/full`, request);
  }
}
