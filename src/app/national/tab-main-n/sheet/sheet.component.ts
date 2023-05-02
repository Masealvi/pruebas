import { Component, OnInit } from '@angular/core';
import { GrafhicsService } from '../../services/graphics.service';
import { ActivatedRoute } from '@angular/router';
import { IndicadorChildToParentService } from '../../services/graficas/indicador-child-to-parent.service';

import { Utilidades } from 'src/app/utils/utilidades';




@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css']
})
export class SheetComponent implements OnInit {
 
  codes: any;

  fichaUrl?:string;
  definicionIndicador?: string;
  formulaCalculo?: string;
  descripcionFormula?: string;
  unidadMedicion?: string;
  tipoIndicador?:string;
  nivelDesagregacion?:string;
  perdiodoDisponibilidad?:string;
  
  constructor(
    private graphicsService: GrafhicsService,
    private route: ActivatedRoute,
    private childToParentService: IndicadorChildToParentService
  ) { }

  ngOnInit(): void {

    this.codes = this.route.snapshot.paramMap.get('code');
    localStorage.setItem("param", JSON.stringify({ graphic: this.codes }));

    this.childToParentService.onChangeIndicador$.next(this.codes);

    this.getFileIndicator(this.codes);

  }

  private getFileIndicator(code :string) {
    this.graphicsService.getFileIndicator(code).subscribe(
      (response) => {
       
          this.fichaUrl=response.ficha.url;
          this.definicionIndicador=response.datos['definicion-del-indicador'];
          this.formulaCalculo=response.datos['formula-de-calculo'];
          this.descripcionFormula=response.datos['descripcion-de-la-formula'];
          this.unidadMedicion=response.datos['unidad-de-medicion-del-indicador-dimensiones'];
          this.tipoIndicador=response.datos['tipo-de-indicador'];
          this.nivelDesagregacion=response.datos['nivel-de-desagregacion'];
          this.perdiodoDisponibilidad=response.datos['periodo-de-disponibilidad'];

      },
      (error) => {

        Utilidades.getMensajeModal('Indicador No existe', 'info');
      },
    );
  }

}
