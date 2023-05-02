
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DirectoryService {
  
  private baseComparative =environment.baseComparative;

  constructor(private http: HttpClient) { }


  public getDetalleOperador(detalleOperadorId: any): Observable<any> {
    return this.http.get<any>(`${this.baseComparative}/operadores/${detalleOperadorId}`);
  }

  public getAllTipoOperador(): Observable<any> {
    return this.http.get<any>(`${this.baseComparative}/maestros/tipo_operador`);
  }
  public getAllCircunscripcionAduanera(): Observable<any> {
    return this.http.get<any>(`${this.baseComparative}/maestros/circunscripcion_aduanera`);
  }

  public getFiltroDirectory(filters: any[]) {
    const groupchips = this.groupChips(filters);
    let url = `${this.baseComparative}/operadores`;
    let contador = 0;
    url += groupchips ? '?' : '';
    groupchips?.forEach(filter => {
      contador++;
      if (contador == groupchips.length) {
        url += `${filter.tipo}=${filter.code}`;
      } else {
        url += `${filter.tipo}=${filter.code}&`;
      }

    });
    
    return this.http.get<any>(url);
  }


  public groupChips(data: any[]){
    const result = data.reduce((acc: any[], cur) => {
      const { tipo, code } = cur;

      const found = acc.find((item) => item.tipo === tipo);
      if (found) {
        found.code += `,${code}`;
      } else {
        acc.push({tipo: `${tipo}`, code: `${code}`,valor:"0"});
      }
      return acc;
    }, []);
    
    console.log(result);
    return result;
  }


}
