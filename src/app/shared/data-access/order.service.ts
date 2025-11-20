import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from './entities/Order';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(environment.BASE_API_URL + '/api/orders/' + id);
  }

  postOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(environment.BASE_API_URL + '/api/orders', order);
  }
}
