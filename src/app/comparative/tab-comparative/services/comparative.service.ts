import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })

  export class ComparativeService{
    private baseComparative =environment.baseComparative;


    constructor(private http: HttpClient) { }

    public getAllTipoOperador(): Observable<any> {
        return this.http.get<any>(`${this.baseComparative}/maestros/tipo_operador`);
      }
    
      public getAllTipoComercio(): Observable<any> {
        return this.http.get<any>(`${this.baseComparative}/maestros/tipo_comercio`);
      }
      public getAllTipoServicio(): Observable<any> {
        return this.http.get<any>(`${this.baseComparative}/maestros/tipo_servicio`);
      }
      public getAllTerminalPortuario(): Observable<any> {
        return this.http.get<any>(`${this.baseComparative}/maestros/terminal_portuario`);
      }
      public getAllCircunscripcionAduanera(): Observable<any> {
        return this.http.get<any>(`${this.baseComparative}/maestros/circunscripcion_aduanera`);
      }
      public getAllTipoCarga(): Observable<any> {
        return this.http.get<any>(`${this.baseComparative}/maestros/tipo_carga`);
      }
      public getAllTipoViaProcedencia(): Observable<any> {
        return this.http.get<any>(`${this.baseComparative}/maestros/tipo_via_procedencia`);
      }
      public getAllModalidadTransporte(): Observable<any> {
        return this.http.get<any>(`${this.baseComparative}/maestros/modalidad_transporte`);
      }
      public getAllPaises(): Observable<any> {
        return this.http.get<any>(`${this.baseComparative}/maestros/paises`);
      }
      public getAllPuertos(): Observable<any> {
        return this.http.get<any>(`${this.baseComparative}/maestros/puerto`);
      }
      public getAllZonas(): Observable<any> {
        return this.http.get<any>(`${this.baseComparative}/maestros/zona`);
      }
      public getAllLineaNaviera(): Observable<any> {
        return this.http.get<any>(`${this.baseComparative}/maestros/linea_naviera`);
      }
      public getAllDocTransporte(): Observable<any> {
        return this.http.get<any>(`${this.baseComparative}/maestros/tipo_documento_transporte`);
      }
      public getAllCategoria(): Observable<any> {
        return this.http.get<any>(`${this.baseComparative}/maestros/categoria`);
      }
      public getAllMoneda(): Observable<any> {
        return this.http.get<any>(`${this.baseComparative}/maestros/moneda`);
      }

      public getFiltroTipoComparative(filters?: any[]): Observable<any> {
    
        let url = `${this.baseComparative}/servicios`;
    
        let contador = 0;
        url += filters ? '?' : '';
        filters?.forEach(filter => {
          contador++;
          if (contador == filters.length) {
            url += `${filter.tipo}=${filter.code}`;
          } else {
            url += `${filter.tipo}=${filter.code}&`;
          }
    
        });
    
        return this.http.get<any>(url);
      }
      public getServices(monedaId?: any ,filters?: any[]):Observable<any>{
        let url = `${this.baseComparative}/servicios`;
    
        let contador = 0;
        url += filters ? '?' : '';
        filters?.forEach(filter => {
          contador++;
          if (contador == filters.length) {
            url += `?${filter.tipo}=${filter.code}`;
          } else {
            url = `${this.baseComparative}/servicios`;
          }
    
        });
        return this.http.get<any>(url);
      }
  }