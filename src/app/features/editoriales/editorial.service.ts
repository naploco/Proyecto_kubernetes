import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
//import { environment } from '../../../environments/environment';
import { ConfigService } from '../../core/config.service';

export interface Editorial {
  id?: number;
  nombre: string;
  ciudad: string;
}

@Injectable({ providedIn: 'root' })
export class EditorialService {
  private baseUrl ='';
  
  constructor(private config: ConfigService, private _http: HttpClient) {
    this.baseUrl = `${this.config.apiUrl.replace(/\/$/, '')}/editorial`;
  }

  getAll(): Observable<Editorial[]> {
    return this._http.get<Editorial[]>(this.baseUrl);
  }

  create(data: Partial<Editorial>): Observable<Editorial> {
    return this._http.post<Editorial>(this.baseUrl, data);
  }

  update(id: number, data: Partial<Editorial>): Observable<Editorial> {
    return this._http.put<Editorial>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this._http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
