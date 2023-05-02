import { Component, OnInit } from '@angular/core';
import { IndicadorMultilateralService } from '../../services/indicador-multilateral.service';
import { Chart } from 'angular-highcharts';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Graficas } from 'src/app/utils/graficas';
import { Utilidades } from 'src/app/utils/utilidades';
import { SendCodeService } from '../../services/tab/send-code.service';
import { KEY_PARAM_ML } from 'src/app/national/tab-main-n/config/config';
import { ITEM_PERU, ITEM_TODOS } from 'src/app/utils/constantes';

@Component({
  selector: 'app-patents',
  templateUrl: './patents.component.html',
  styleUrls: ['./patents.component.css']
})
export class PatentsComponent implements OnInit {
  formGraficarPatents?: FormGroup;
  alertMessagePatents: boolean = true;
  inactiveButtonPatents: boolean = true;
  loadingPatents: boolean = true;
  paisesPatents = new FormControl();
  aniosPatents = new FormControl();

  yearsPatents: any;
  countriesPatents: any;

  private dataPatente: any;

  lineChartPatents: Chart = new Chart();
  columnChartPatents: Chart = new Chart();
  tableHtmlPatents: any;

  codesPatents: any;
  constructor(
    private indicadorMultilateralService: IndicadorMultilateralService,
    private route: ActivatedRoute,
    private sendCodeService: SendCodeService,
  ) { }

  ngOnInit(): void {
    this.codesPatents = this.route.snapshot.paramMap.get('codigo');
    localStorage.setItem(KEY_PARAM_ML, JSON.stringify({ graphic: this.codesPatents }));
    this.sendCodeService.onChangeIndicador$.next(this.codesPatents);
    this.getIndicatorMultilateralPatents(this.codesPatents);
  }

  private getIndicatorMultilateralPatents(code: string) {
    this.indicadorMultilateralService.getIndicatorMultilateralByCode(code).subscribe(
      (response) => {
        this.dataPatente = response.data[1]; // data
        this.yearsPatents = Utilidades.getYears(this.dataPatente.series, 0)
        this.countriesPatents = Utilidades.getCountries(this.dataPatente.series, 1);
        this.countriesPatents.unshift(ITEM_TODOS);
        this.loadingPatents = this.dataPatente !== null ? false : true;
      }
    );

  }

  //#CHIPS
  selectablePatents = true;
  removablePatents = true;
  selectToChipsPatents: any[] = [];

  removeChip(seleccionado: any) {
    Utilidades.removeChip(this.selectToChipsPatents, seleccionado, this.paisesPatents, this.aniosPatents);
    this.inactiveButtonPatents = !(this.selectToChipsPatents.some(e => e.tipo === 'A') && this.selectToChipsPatents.some(e => e.tipo === 'P'));
    if (!this.inactiveButtonPatents) {
      this.graficarPatents();
    } else {
      this.alertMessagePatents = true;
    }
  }
  //END CHIPS

  getFiltrosAplicados(code: any, value: any, strTipo: string) {
    if (code == ITEM_TODOS.code) { // ALL
      let _index = this.paisesPatents.value.findIndex((e: any) => e === ITEM_TODOS.name);
      // retirar paises de select
      this.paisesPatents.value.length = 0;
      // retirar los paises de chips
      this.selectToChipsPatents = this.selectToChipsPatents.filter(e => e.tipo !== strTipo);
      // Seleccionado
      if (_index > -1) {
        this.countriesPatents.forEach((e: any) => {
          this.paisesPatents.value.push(e.name)
          this.selectToChipsPatents.push({ code: e.code, valor: e.name, tipo: strTipo });
        });
      }
      this.paisesPatents.patchValue(this.paisesPatents.value); // check | uncheck

      if (this.paisesPatents.value.length > 0) {
        // retirar el pais ALL
        _index = this.paisesPatents.value.findIndex((e: any) => e === ITEM_TODOS.name);
        this.paisesPatents.value.splice(_index, 1);
        // retirar de chips
        _index = this.selectToChipsPatents.findIndex((e: any) => e.valor === ITEM_TODOS.name);
        this.selectToChipsPatents.splice(_index, 1);
      }
    } else {
      let resultado = this.selectToChipsPatents.find(e => e.code === code) ?? null;
      if (resultado == null) {
        this.selectToChipsPatents.push({ code: code, valor: value, tipo: strTipo });
      } else {
        this.selectToChipsPatents = this.selectToChipsPatents.filter(e => e.code !== code);
      }
    }
    this.inactiveButtonPatents = !(this.selectToChipsPatents.some(e => e.tipo === 'A') && this.selectToChipsPatents.some(e => e.tipo === 'P'));
    if (!this.inactiveButtonPatents) {
      this.graficarPatents();
    }
  }

  //botón graficar
  graficarPatents(): void {
    this.alertMessagePatents = false;
    // process.
    let aFiltro = [...this.selectToChipsPatents];
    aFiltro.unshift(ITEM_PERU);
    let dataOrdenadaChart = Utilidades.orderArray(this.getDataLeaked(aFiltro), 0);

    //grafica de columna
    this.columnChartPatents = Graficas.generateColumnChart(dataOrdenadaChart);
    //grafica de linea
    this.lineChartPatents = Graficas.generateLineChart(dataOrdenadaChart, false);
    //grafica table
    this.tableHtmlPatents = Graficas.generateTable3(dataOrdenadaChart);
  }

  getDataLeaked(data: any[]) {
    let arrayFiltradoPatents: any[] = [];
    let newFiltradoPatents: any[] = [];
    let arrayPaisPatents: any[] = [];
    let arrayAnioPatents: any[] = [];
    let aDataPatents: any[] = [];
    let seriePatents = this.dataPatente.series;

    for (let index = 0; index < data.length; index++) {
      if (data[index].tipo === 'P') {
        arrayPaisPatents.push(data[index].code);
      }
      if (data[index].tipo === 'A') {
        arrayAnioPatents.push(data[index].code);
      }
    }

    arrayPaisPatents.forEach((e) => {
      seriePatents.filter((s: any) => {
        if (s[2] == e) {
          aDataPatents.push(s);
        }
      });
    });

    arrayAnioPatents.forEach((e) => {
      aDataPatents.forEach((s) => {
        if (s[0] == e) {
          arrayFiltradoPatents.push(s);
          newFiltradoPatents.push(s.slice(0, 3));
        }
      });
    });
    for (let index = 0; index < arrayFiltradoPatents.length; index++) {
      let valor: number;
      valor = parseFloat(arrayFiltradoPatents[index].slice(3));
      newFiltradoPatents[index].push(valor);

    }
    return newFiltradoPatents;
  }

}
