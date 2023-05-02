import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Utilidades } from 'src/app/utils/utilidades';
import { IndicadorMultilateralService } from '../../services/indicador-multilateral.service';
import { FormControl } from '@angular/forms';
import { Chart } from 'angular-highcharts';
import { Graficas } from 'src/app/utils/graficas';
import { SendCodeService } from '../../services/tab/send-code.service';
import { KEY_PARAM_ML } from 'src/app/national/tab-main-n/config/config';

import * as Highcharts from 'highcharts';
import { ITEM_PERU } from 'src/app/utils/constantes';

declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);

@Component({
  selector: 'app-comparison-by-measures',
  templateUrl: './comparison-by-measures.component.html',
  styleUrls: ['./comparison-by-measures.component.css']
})
export class ComparisonByMeasuresComponent implements OnInit {
  codesMeasures: any;
  yearsMeasures: any;
  countriesMeasures: any;
  alertMessageMeasures: boolean = true;
  inactiveButtonMeasures: boolean = true;
  loadingMeasures: boolean = true;
  radialChartMeasures: Chart = new Chart();
  barChartMeasures: Chart = new Chart();
  tableHtmlMeasures: any;

  dataComparaMedidas: any;

  paisesMeasures = new FormControl();
  aniosMeasures = new FormControl();

  constructor(
    private indicadorMultilateralService: IndicadorMultilateralService,
    private route: ActivatedRoute,
    private sendCodeService: SendCodeService,
  ) { }

  ngOnInit(): void {
    this.codesMeasures = this.route.snapshot.paramMap.get('codigo');
    localStorage.setItem(KEY_PARAM_ML, JSON.stringify({ graphic: this.codesMeasures }));
    this.sendCodeService.onChangeIndicador$.next(this.codesMeasures);
    this.getIndicatorMultilateralMeasures(this.codesMeasures);
  }

  private getIndicatorMultilateralMeasures(code: string) {
    this.indicadorMultilateralService.getIndicatorMultilateralByCode(code).subscribe(
      (response) => {
        this.dataComparaMedidas = response.data[2];
        this.yearsMeasures = Utilidades.getYears(this.dataComparaMedidas.series, 0)
        this.countriesMeasures = Utilidades.getCountries(this.dataComparaMedidas.series, 1);
        this.loadingMeasures = this.dataComparaMedidas !== null ? false : true;
      }
    );
  }

  //#CHIPS
  selectable = true;
  removable = true;
  selectToChips: any[] = [];

  removeChip(seleccionado: any) {
    Utilidades.removeChip(this.selectToChips, seleccionado, this.paisesMeasures, this.aniosMeasures);
    this.inactiveButtonMeasures = !(this.selectToChips.some(e => e.tipo === 'A') && this.selectToChips.some(e => e.tipo === 'P'));
    if (!this.inactiveButtonMeasures) {
      this.graficarMeasures();
    } else {
      this.alertMessageMeasures = true;
    }
  }
  //END CHIPS
  getCodePais(valor: string, code: string): string {
    return (this.countriesMeasures.find((c: any) => c.name == valor) ?? { code: code }).code;
  }
  getFiltrosAplicados(code: any, value: any, strTipo: string) {
    let anio = null, aPais = null;
    if (strTipo == "P") {
      if (this.paisesMeasures.value.length > 4) {
        Utilidades.getMensajeModal('Selección máxima de 4 países', 'info');
        this.paisesMeasures.patchValue(this.paisesMeasures.value.filter((e: any) => e != value));
      }
      // Paises seleccionados [Lista]
      aPais = this.paisesMeasures.value.map((e: any) => (
        {
          code: this.getCodePais(e, code),
          valor: e,
          tipo: strTipo
        }
      ));
      // Anio Seleccionado (En Chips)
      anio = this.selectToChips.find(e => e.tipo == "A") ?? null;
    } else {
      // Anio Seleccionado [lista]
      anio = { code: code, valor: value, tipo: strTipo };
      // Paises seleccionados (En Chips)
      aPais = this.selectToChips.filter(e => e.tipo == "P") ?? null;
    }
    // reset chips
    this.selectToChips = [];
    if (anio != null) {
      this.selectToChips.push(anio);
    }
    if (aPais != null && aPais.length > 0) {
      this.selectToChips.push(...aPais);
    }
    this.inactiveButtonMeasures = !(this.selectToChips.some(e => e.tipo === 'A') && this.selectToChips.some(e => e.tipo === 'P'));
    if (!this.inactiveButtonMeasures) {
      this.graficarMeasures();
    }
  }

  graficarMeasures(): void {
    this.alertMessageMeasures = false;
    // process.
    let category = this.dataComparaMedidas.dimensiones.slice(3);
    let aFiltro = [...this.selectToChips];
    aFiltro.unshift(ITEM_PERU);
    //grafica de barra
    this.barChartMeasures = Graficas.generateBarChart2(category, this.getDataLeaked(aFiltro));
    //grafica de linea
    this.radialChartMeasures = Graficas.genarateSpiderChart(category, this.getDataLeaked(aFiltro), 1, true);
    //grafica table
    this.tableHtmlMeasures = Graficas.generateTable2(category, this.getDataLeaked(aFiltro));
  }

  getDataLeaked(data: any[]) {
    let arrayFiltradoMedidas: any[] = [];
    let arrayPaisMedidas: any[] = [];
    let arrayAnioMedidas: any[] = [];
    let aDataMedidas: any[] = [];
    let serieMedidas = this.dataComparaMedidas.series;

    for (let index = 0; index < data.length; index++) {
      if (data[index].tipo === 'P') {
        arrayPaisMedidas.push(data[index].code);
      }
      if (data[index].tipo === 'A') {
        arrayAnioMedidas.push(data[index].code);
      }
    }

    arrayPaisMedidas.forEach((e) => {
      serieMedidas.filter((s: any) => {
        if (s[2] == e) {
          aDataMedidas.push(s);
        }
      });
    });

    arrayAnioMedidas.forEach((e) => {
      aDataMedidas.forEach((s) => {
        if (s[0] == e) {
          arrayFiltradoMedidas.push(s);
        }
      });
    });
    return arrayFiltradoMedidas;
  }

}
