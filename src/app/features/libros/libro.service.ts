import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Libro } from './libro.model';
//import { environment } from '../../../environments/environment';
import { ConfigService } from '../../core/config.service';

@Injectable({ providedIn: 'root' })
export class LibrosService {
  private baseUrl ='';
  
  constructor(private config: ConfigService, private _http: HttpClient) {
    this.baseUrl = `${this.config.apiUrl.replace(/\/$/, '')}/libro`;
  }

  getAll(): Observable<Libro[]> {
    return this._http.get<Libro[]>(this.baseUrl);
  }

  create(data: Partial<Libro>): Observable<Libro> {
    return this._http.post<Libro>(this.baseUrl, data);
  }

  delete(id: number): Observable<void> {
    return this._http.delete<void>(`${this.baseUrl}/${id}`);
  }

  update(id: number, data: Partial<Libro>): Observable<Libro> {
    return this._http.put<Libro>(`${this.baseUrl}/${id}`, data);
  }
}
