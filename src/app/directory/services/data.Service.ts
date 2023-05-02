import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private domicilioFiscal: string="";

  constructor() { }

  setDomicilioFiscal(domicilioFiscal: string): void {
    this.domicilioFiscal = domicilioFiscal;
  }

  getDomicilioFiscal(): string {
    return this.domicilioFiscal;
  }
}
