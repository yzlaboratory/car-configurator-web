import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from './entities/Config';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private http = inject(HttpClient);

  getConfig(id: string): Observable<Config> {
    return this.http.get<Config>(environment.BASE_API_URL + '/api/configs/' + id);
  }

  postConfig(config: Config): Observable<Config> {
    return this.http.post<Config>(environment.BASE_API_URL + '/api/configs', config);
  }
}
