// src/app/core/config.service.ts

import { Injectable } from '@angular/core';

export interface AppConfig {
  apiUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly config: AppConfig;

  constructor() {
    const win = window as any;

    this.config = {
      apiUrl: win?.env?.apiUrl || '/api'
    };
  }

  /** Devuelve la URL base de la API configurada dinámicamente */
  get apiUrl(): string {
    return this.config.apiUrl;
  }
}
