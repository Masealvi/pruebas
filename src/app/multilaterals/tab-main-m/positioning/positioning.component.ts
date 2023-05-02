import { Component, OnInit } from '@angular/core';
import { IndicadorMultilateralService } from '../../services/indicador-multilateral.service';
import { Chart } from 'angular-highcharts';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Graficas } from 'src/app/utils/graficas';
import { Utilidades } from 'src/app/utils/utilidades';
import { SendCodeService } from '../../services/tab/send-code.service';
import { KEY_PARAM_ML } from 'src/app/national/tab-main-n/config/config';
import { ITEM_PERU, ITEM_TODOS } from 'src/app/utils/constantes';

@Component({
  selector: 'app-positioning',
  templateUrl: './positioning.component.html',
  styleUrls: ['./positioning.component.css']
})
export class PositioningComponent implements OnInit {
  formGraficarPositioning?: FormGroup;
  alertMessagePositioning: boolean = true;
  inactiveButtonPositioning: boolean = true;
  paisesPositioning = new FormControl();
  aniosPositioning = new FormControl();
  loadingPositioning: boolean = true;

  _aKeys: any = { score: "3", rank: "4" };

  yearsPositioning: any;
  countriesPositioning: any;
  tableValuePositioning: any;

  private dataPosicionamiento: any;

  lineChartPositioning: Chart = new Chart();
  barChartPositioning: Chart = new Chart();
  tableHtmlPositioning: any;

  codesPositioning: any;
  nameIndicatorPositioning: string = '';

  constructor(
    private indicadorMultilateralService: IndicadorMultilateralService,
    private route: ActivatedRoute,
    private sendCodeService: SendCodeService,
    private fb: FormBuilder
  ) {
    this.crarFormularioPositioning();
  }

  ngOnInit(): void {
    this.codesPositioning = this.route.snapshot.paramMap.get('codigo');
    localStorage.setItem(KEY_PARAM_ML, JSON.stringify({ graphic: this.codesPositioning }));
    this.sendCodeService.onChangeIndicador$.next(this.codesPositioning);
    this.getIndicatorMultilateralPositioning(this.codesPositioning);
  }

  private getIndicatorMultilateralPositioning(code: string) {
    this.indicadorMultilateralService.getIndicatorMultilateralByCode(code).subscribe(
      (response) => {
        this.nameIndicatorPositioning = response.nombreIndicador;
        this.dataPosicionamiento = response.data[1]; // data
        this.yearsPositioning = Utilidades.getYears(this.dataPosicionamiento.series, 0)
        this.countriesPositioning = Utilidades.getCountries(this.dataPosicionamiento.series, 1);
        this.countriesPositioning.unshift(ITEM_TODOS);
        this.loadingPositioning = this.nameIndicatorPositioning == null ? true : false;
      }
    );
  }

  private crarFormularioPositioning(): void {
    this.formGraficarPositioning = this.fb.group({
      cboOrden: [this._aKeys.score]
    });
  }

  //#CHIPS
  selectablePositioning = true;
  removablePositioning = true;
  selectToChipsPositioning: any[] = [];

  removeChipPositioning(seleccionado: any) {
    Utilidades.removeChip(this.selectToChipsPositioning, seleccionado, this.paisesPositioning, this.aniosPositioning)
    this.inactiveButtonPositioning = !(this.selectToChipsPositioning.some(e => e.tipo === 'A') && this.selectToChipsPositioning.some(e => e.tipo === 'P'));
    if (!this.inactiveButtonPositioning) {
      this.graficarPositioning();
    } else {
      this.alertMessagePositioning = true;
    }
  }
  //END CHIPS

  getFiltrosAplicadosPositioning(code: any, value: any, strTipo: string) {
    if (code == ITEM_TODOS.code) { // ALL
      let _index = this.paisesPositioning.value.findIndex((e: any) => e === ITEM_TODOS.name);
      // retirar paises de select
      this.paisesPositioning.value.length = 0;
      // retirar los paises de chips
      this.selectToChipsPositioning = this.selectToChipsPositioning.filter(e => e.tipo !== strTipo);
      // Seleccionado
      if (_index > -1) {
        this.countriesPositioning.forEach((e: any) => {
          this.paisesPositioning.value.push(e.name)
          this.selectToChipsPositioning.push({ code: e.code, valor: e.name, tipo: strTipo });
        });
      }
      this.paisesPositioning.patchValue(this.paisesPositioning.value); // check | uncheck

      if (this.paisesPositioning.value.length > 0) {
        // retirar el pais ALL
        _index = this.paisesPositioning.value.findIndex((e: any) => e === ITEM_TODOS.name);
        this.paisesPositioning.value.splice(_index, 1);
        // retirar de chips
        _index = this.selectToChipsPositioning.findIndex((e: any) => e.valor === ITEM_TODOS.name);
        this.selectToChipsPositioning.splice(_index, 1);
      }
    } else {
      let resultado = this.selectToChipsPositioning.find(e => e.code === code) ?? null;
      if (resultado == null) {
        this.selectToChipsPositioning.push({ code: code, valor: value, tipo: strTipo });
      } else {
        this.selectToChipsPositioning = this.selectToChipsPositioning.filter(e => e.code !== code);
      }
    }
    this.inactiveButtonPositioning = !(this.selectToChipsPositioning.some(e => e.tipo === 'A') && this.selectToChipsPositioning.some(e => e.tipo === 'P'));
    if (!this.inactiveButtonPositioning) {
      this.graficarPositioning();
    }
  }

  //botón graficar
  graficarPositioning(): void {
    this.alertMessagePositioning = false;
    let itemSearch = this.formGraficarPositioning?.get("cboOrden")?.value;
    // process.
    let aFiltro = [...this.selectToChipsPositioning];
    aFiltro.unshift(ITEM_PERU);
    aFiltro.push({ code: itemSearch, valor: itemSearch, tipo: "G" });

    let aDataOrdenaPositioning = Utilidades.orderArray(this.getDataLeaked(aFiltro), 0);

    //grafica de barra
    this.barChartPositioning = Graficas.generateBarChart(aDataOrdenaPositioning);
    //grafica de linea
    this.lineChartPositioning = Graficas.generateLineChart(aDataOrdenaPositioning, false);
    //grafica table
    this.tableHtmlPositioning = Graficas.generateTable(this.tableValuePositioning, this.nameIndicatorPositioning);
  }

  getDataLeaked(data: any[]) {
    let arrayFiltradoPositioning: any[] = [];
    let newFiltradoPositioning: any[] = [];
    let arrayPaisPositioning: any[] = [];
    let arrayAnioPositioning: any[] = [];
    let posMedidaPositioning: number = 0;
    let aDataPositioning: any[] = [];
    let seriePositioning = this.dataPosicionamiento.series;

    for (let index = 0; index < data.length; index++) {
      if (data[index].tipo === 'P') {
        arrayPaisPositioning.push(data[index].code);
      }
      if (data[index].tipo === 'A') {
        arrayAnioPositioning.push(data[index].code);
      }
      if (data[index].tipo === 'G') {
        posMedidaPositioning = parseFloat(data[index].code);
      }
    }

    arrayPaisPositioning.forEach((e) => {
      seriePositioning.filter((s: any) => {
        if (s[2] == e) {
          aDataPositioning.push(s);
        }
      });
    });

    arrayAnioPositioning.forEach((e) => {
      aDataPositioning.forEach((s) => {
        if (s[0] == e) {
          arrayFiltradoPositioning.push(s);
          newFiltradoPositioning.push(s.slice(0, 3));
        }
      });
    });
    this.tableValuePositioning = arrayFiltradoPositioning;

    for (let index = 0; index < arrayFiltradoPositioning.length; index++) {
      let valor: number;
      valor = parseFloat(arrayFiltradoPositioning[index].slice(posMedidaPositioning, posMedidaPositioning + 1));
      newFiltradoPositioning[index].push(valor);
    }
    return newFiltradoPositioning;
  }
}