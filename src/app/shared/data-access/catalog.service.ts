import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Catalog } from './entities/Catalog';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private http = inject(HttpClient);

  getCatalog(): Observable<Catalog> {
    return this.http.get<Catalog>(
      environment.BASE_API_URL + '/api/catalog/items?modelId=Astral X_2025',
    );
  }
}
