import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Deal, DealCreate } from '../models/deal.model';

@Injectable({
  providedIn: 'root',
})
export class DealsService {
  constructor(private http: HttpClient) {}

  getDeals(): Observable<Deal[]> {
    return this.http
      .get<{ deals: Deal[] }>(`${environment.apiUrl}/api/deals`)
      .pipe(map((response) => response.deals));
  }

  createDeal(data: DealCreate): Observable<Deal> {
    return this.http
      .post<{ deal: Deal }>(`${environment.apiUrl}/api/deals`, data)
      .pipe(map((response) => response.deal));
  }
}
