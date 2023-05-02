import { Component, OnInit } from '@angular/core';
import { IndicadorMultilateralService } from '../../services/indicador-multilateral.service';
import { Utilidades } from 'src/app/utils/utilidades';
import { Chart } from 'angular-highcharts';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Graficas } from 'src/app/utils/graficas';
import { SendCodeService } from '../../services/tab/send-code.service';
import { KEY_PARAM_ML } from 'src/app/national/tab-main-n/config/config';
import { ITEM_PERU, ITEM_TODOS } from 'src/app/utils/constantes';

@Component({
  selector: 'app-railways',
  templateUrl: './railways.component.html',
  styleUrls: ['./railways.component.css']
})
export class RailwaysComponent implements OnInit {
  formGraficarRailways?: FormGroup;
  alertMessageRailways: boolean = true;
  inactiveButtonRailways: boolean = true;
  loadingRailways: boolean = true;
  paisesRailways = new FormControl();
  aniosRailways = new FormControl();

  yearsRailways: any;
  countriesRailways: any;

  private dataRailways: any;
  private medida: any[] = [];
  medidaFiltrado: any[] = [];

  lineChartRailways: Chart = new Chart();
  columnChartRailways: Chart = new Chart();
  tableHtmlRailways: any;

  codesRailways: any;
  nameGraphicRailways?: string;

  constructor(
    private indicadorMultilateralService: IndicadorMultilateralService,
    private route: ActivatedRoute,
    private sendCodeService: SendCodeService,
    private fb: FormBuilder
  ) {
    this.crarFormularioRailways();
  }

  ngOnInit(): void {
    this.codesRailways = this.route.snapshot.paramMap.get('codigo');
    localStorage.setItem(KEY_PARAM_ML, JSON.stringify({ graphic: this.codesRailways }));
    this.sendCodeService.onChangeIndicador$.next(this.codesRailways);
    this.getIndicatorMultilateralRailways(this.codesRailways);
  }

  private crarFormularioRailways(): void {
    this.formGraficarRailways = this.fb.group({
      cboMedida: [],
    });
  }

  private getIndicatorMultilateralRailways(code: string) {
    this.indicadorMultilateralService.getIndicatorMultilateralByCode(code).subscribe(
      (response) => {
        this.dataRailways = response.data[3];
        this.yearsRailways = Utilidades.getYears(this.dataRailways.series, 0)
        this.countriesRailways = Utilidades.getCountries(this.dataRailways.series, 1);
        this.countriesRailways.unshift(ITEM_TODOS);
        this.medida = this.dataRailways.dimensiones; // Originales
        this.getMedidaFiltradoRailways();
        this.loadingRailways = this.dataRailways !== null ? false : true;
      }
    );

  }

  private getMedidaFiltradoRailways(): void {
    let _newDimensiones: any[] = this.medida;
    this.medidaFiltrado = _newDimensiones.map(e => e).slice(3);
    if (this.medidaFiltrado != null && this.medidaFiltrado.length > 0) {
      this.formGraficarRailways?.get("cboMedida")?.setValue(this.medidaFiltrado[0]);
    }
  }

  //#CHIPS
  selectableRailways = true;
  removableRailways = true;
  selectToChipsRailways: any[] = [];

  removeChip(seleccionado: any) {
    Utilidades.removeChip(this.selectToChipsRailways, seleccionado, this.paisesRailways, this.aniosRailways);
    this.inactiveButtonRailways = !(this.selectToChipsRailways.some(e => e.tipo === 'A') && this.selectToChipsRailways.some(e => e.tipo === 'P'));
    if (!this.inactiveButtonRailways) {
      this.graficarRailways();
    } else {
      this.alertMessageRailways = true;
    }
  }
  //END CHIPS

  getFiltrosAplicadosRailways(code: any, value: any, strTipo: string) {
    if (code == ITEM_TODOS.code) { // ALL
      let _index = this.paisesRailways.value.findIndex((e: any) => e === ITEM_TODOS.name);
      // retirar paises de select
      this.paisesRailways.value.length = 0;
      // retirar los paises de chips
      this.selectToChipsRailways = this.selectToChipsRailways.filter(e => e.tipo !== strTipo);
      // Seleccionado
      if (_index > -1) {
        this.countriesRailways.forEach((e: any) => {
          this.paisesRailways.value.push(e.name)
          this.selectToChipsRailways.push({ code: e.code, valor: e.name, tipo: strTipo });
        });
      }
      this.paisesRailways.patchValue(this.paisesRailways.value); // check | uncheck

      if (this.paisesRailways.value.length > 0) {
        // retirar el pais ALL
        _index = this.paisesRailways.value.findIndex((e: any) => e === ITEM_TODOS.name);
        this.paisesRailways.value.splice(_index, 1);
        // retirar de chips
        _index = this.selectToChipsRailways.findIndex((e: any) => e.valor === ITEM_TODOS.name);
        this.selectToChipsRailways.splice(_index, 1);
      }
    } else {
      let resultado = this.selectToChipsRailways.find(e => e.code === code) ?? null;
      if (resultado == null) {
        this.selectToChipsRailways.push({ code: code, valor: value, tipo: strTipo });
      } else {
        this.selectToChipsRailways = this.selectToChipsRailways.filter(e => e.code !== code);
      }
    }
    this.inactiveButtonRailways = !(this.selectToChipsRailways.some(e => e.tipo === 'A') && this.selectToChipsRailways.some(e => e.tipo === 'P'));
    if (!this.inactiveButtonRailways) {
      this.graficarRailways();
    }
  }

  getDataLeaked(data: any[]) {
    let arrayFiltradoRailways: any[] = [];
    let newFiltradoRailways: any[] = [];
    let arrayPaisRailways: any[] = [];
    let arrayAnioRailways: any[] = [];
    let posMedidaRailways: number = 0;
    let aDataRailways: any[] = [];
    let serieRailways = this.dataRailways.series;

    for (let index = 0; index < data.length; index++) {
      if (data[index].tipo === 'P') {
        arrayPaisRailways.push(data[index].code);
      }
      if (data[index].tipo === 'A') {
        arrayAnioRailways.push(data[index].code);
      }
      if (data[index].tipo === 'G') {
        posMedidaRailways = parseFloat(data[index].code);
      }
    }

    arrayPaisRailways.forEach((e) => {
      serieRailways.filter((s: any) => {
        if (s[2] == e) {
          aDataRailways.push(s);
        }
      });
    });

    arrayAnioRailways.forEach((e) => {
      aDataRailways.forEach((s) => {
        if (s[0] == e) {
          arrayFiltradoRailways.push(s);
          newFiltradoRailways.push(s.slice(0, 3));
        }
      });
    });

    for (let index = 0; index < arrayFiltradoRailways.length; index++) {
      let valor: number;
      valor = parseFloat(arrayFiltradoRailways[index].slice(posMedidaRailways, posMedidaRailways + 1));
      newFiltradoRailways[index].push(valor);
    }
    return newFiltradoRailways;
  }

  //botón graficar
  graficarRailways(): void {
    this.alertMessageRailways = false;
    let itemSearch = this.formGraficarRailways?.get("cboMedida")?.value;
    let posMedida = this.medida.findIndex((e: any) => e === itemSearch);
    this.nameGraphicRailways = itemSearch;

    if (posMedida == -1) {
      // no selecciono medida | medida seleccionada no existe...
      return;
    }

    // process.
    let aFiltro = [...this.selectToChipsRailways];
    aFiltro.unshift(ITEM_PERU);
    aFiltro.push({ code: posMedida, valor: posMedida, tipo: "G" });
    let dataOrdenadaChartRailways = Utilidades.orderArray(this.getDataLeaked(aFiltro), 0);
    //grafica de columna
    this.columnChartRailways = Graficas.generateColumnChart(dataOrdenadaChartRailways);
    //grafica de linea
    this.lineChartRailways = Graficas.generateLineChart(dataOrdenadaChartRailways, false);
    //grafica table
    this.tableHtmlRailways = Graficas.generateTable3(dataOrdenadaChartRailways);
  }

  changeSelectorRailways() {
    this.inactiveButtonRailways = !(this.selectToChipsRailways.some(e => e.tipo === 'A') && this.selectToChipsRailways.some(e => e.tipo === 'P'));
    if (!this.inactiveButtonRailways) {
      this.graficarRailways();
    }
  }

}
