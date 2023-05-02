import { Component, OnInit } from '@angular/core';
import { IndicadorMultilateralService } from '../../services/indicador-multilateral.service';
import { Utilidades } from 'src/app/utils/utilidades';
import { Chart } from 'angular-highcharts';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ITEM_PERU, ITEM_TODOS } from 'src/app/utils/constantes';
import { Graficas } from 'src/app/utils/graficas';
import { SendCodeService } from '../../services/tab/send-code.service';
import { KEY_PARAM_ML } from 'src/app/national/tab-main-n/config/config';

@Component({
  selector: 'app-comparative',
  templateUrl: './comparative.component.html',
  styleUrls: ['./comparative.component.css']
})
export class ComparativeComponent implements OnInit {

  formGraficarComparative?: FormGroup;
  alertMessageComparative: boolean = true;
  inactiveButtonComparative: boolean = true;
  loadingComparative: boolean = true;

  paisesComparative = new FormControl();
  aniosComparative = new FormControl();

  _aKeys: any = { score: "-Score", rank: "-Rank" };

  yearsComparative: any;
  countriesComparative: any;
  tableValueComparative: any[] = [];

  private dataComparativo: any;
  private medida: any[] = [];
  medidaFiltrado: any[] = [];

  lineChartComparative: Chart = new Chart();
  columnChartComparative: Chart = new Chart();
  tableHtmlComparative: any;

  codesComparative: any;
  nameGraphicComparative?: string;

  constructor(
    private indicadorMultilateralService: IndicadorMultilateralService,
    private route: ActivatedRoute,
    private sendCodeService: SendCodeService,
    private fb: FormBuilder
  ) {
    this.crarFormularioComparative();
  }

  ngOnInit(): void {
    this.codesComparative = this.route.snapshot.paramMap.get('codigo');
    localStorage.setItem(KEY_PARAM_ML, JSON.stringify({ graphic: this.codesComparative }));
    this.sendCodeService.onChangeIndicador$.next(this.codesComparative);
    this.getIndicatorMultilateralComparative(this.codesComparative);
  }

  private crarFormularioComparative(): void {
    this.formGraficarComparative = this.fb.group({
      cboMedida: [],
      cboOrden: [this._aKeys.score]
    });
  }

  private getIndicatorMultilateralComparative(code: string) {
    this.indicadorMultilateralService.getIndicatorMultilateralByCode(code).subscribe(
      (response) => {
        this.dataComparativo = response.data[2]; // data
        this.yearsComparative = Utilidades.getYears(this.dataComparativo.series, 0)
        this.countriesComparative = Utilidades.getCountries(this.dataComparativo.series, 1);
        this.countriesComparative.unshift(ITEM_TODOS);
        this.medida = this.dataComparativo.dimensiones; // Originales
        this.getMedidaFiltradoComparative();
        this.loadingComparative = this.dataComparativo == null ? true : false;
      }
    );

  }

  private getMedidaFiltradoComparative(): void {
    let aFitro: string[] = [this._aKeys.score, this._aKeys.rank];
    let _newDimensiones = [...new Set(this.medida.map((e: any) => Utilidades.replaceWordsByKeys(e, aFitro)))];
    this.medidaFiltrado = _newDimensiones.map(e => e).slice(3);
    if (this.medidaFiltrado != null && this.medidaFiltrado.length > 0) {
      this.formGraficarComparative?.get("cboMedida")?.setValue(this.medidaFiltrado[0]);
    }
  }

  //#CHIPS
  selectableComparative = true;
  removableComparative = true;
  selectToChipsComparative: any[] = [];

  removeChipComparative(seleccionado: any) {
    Utilidades.removeChip(this.selectToChipsComparative, seleccionado, this.paisesComparative, this.aniosComparative);
    this.inactiveButtonComparative = !(this.selectToChipsComparative.some(e => e.tipo === 'A') && this.selectToChipsComparative.some(e => e.tipo === 'P'));
    if (!this.inactiveButtonComparative) {
      this.graficarComparativo();
    } else {
      this.alertMessageComparative = true;
    }
  }
  //END CHIPS

  getFiltrosAplicadosComparative(code: any, value: any, strTipo: string) {
    if (code == ITEM_TODOS.code) { // ALL
      let _index = this.paisesComparative.value.findIndex((e: any) => e === ITEM_TODOS.name);
      // retirar paises de select
      this.paisesComparative.value.length = 0;
      // retirar los paises de chips
      this.selectToChipsComparative = this.selectToChipsComparative.filter(e => e.tipo !== strTipo);
      // Seleccionado
      if (_index > -1) {
        this.countriesComparative.forEach((e: any) => {
          this.paisesComparative.value.push(e.name)
          this.selectToChipsComparative.push({ code: e.code, valor: e.name, tipo: strTipo });
        });
      }
      this.paisesComparative.patchValue(this.paisesComparative.value); // check | uncheck

      if (this.paisesComparative.value.length > 0) {
        // retirar el pais ALL
        _index = this.paisesComparative.value.findIndex((e: any) => e === ITEM_TODOS.name);
        this.paisesComparative.value.splice(_index, 1);
        // retirar de chips
        _index = this.selectToChipsComparative.findIndex((e: any) => e.valor === ITEM_TODOS.name);
        this.selectToChipsComparative.splice(_index, 1);
      }
    } else {
      let resultado = this.selectToChipsComparative.find(e => e.code === code) ?? null;
      if (resultado == null) {
        this.selectToChipsComparative.push({ code: code, valor: value, tipo: strTipo });
      } else {
        this.selectToChipsComparative = this.selectToChipsComparative.filter(e => e.code !== code);
      }
    }
    this.inactiveButtonComparative = !(this.selectToChipsComparative.some(e => e.tipo === 'A') && this.selectToChipsComparative.some(e => e.tipo === 'P'));
    if (!this.inactiveButtonComparative) {
      this.graficarComparativo();
    }
  }

  getDataLeaked(data: any[]) {
    let arrayFiltradoComparative: any[] = [];
    let newFiltradoComparative: any[] = [];
    let newTableComparative: any[] = [];
    let arrayPaisComparative: any[] = [];
    let arrayAnioComparative: any[] = [];
    let posMedidaComparative: number = 0;
    let aDataComparative: any[] = [];
    let serieComparative = this.dataComparativo.series;
    let typeOrdeComparative: string = '';

    for (let index = 0; index < data.length; index++) {
      if (data[index].tipo === 'P') {
        arrayPaisComparative.push(data[index].code);
      }
      if (data[index].tipo === 'A') {
        arrayAnioComparative.push(data[index].code);
      }
      if (data[index].tipo === 'G') {
        posMedidaComparative = parseFloat(data[index].code);
        typeOrdeComparative = data[index].valor;
      }
    }
    arrayPaisComparative.forEach((e) => {
      serieComparative.filter((s: any) => {
        if (s[2] == e) {
          aDataComparative.push(s);
        }
      });
    });

    arrayAnioComparative.forEach((e) => {
      aDataComparative.forEach((s) => {
        if (s[0] == e) {
          arrayFiltradoComparative.push(s);
          newFiltradoComparative.push(s.slice(0, 3));
          newTableComparative.push(s.slice(0, 3));
        }
      });
    });

    for (let index = 0; index < arrayFiltradoComparative.length; index++) {
      let valor: number;
      let valor2: number;
      if (typeOrdeComparative == this._aKeys.score) {
        valor = parseFloat(arrayFiltradoComparative[index].slice(posMedidaComparative, posMedidaComparative + 1));
        valor2 = parseFloat(arrayFiltradoComparative[index].slice(posMedidaComparative + 1, posMedidaComparative + 2));
        newFiltradoComparative[index].push(valor);
        newTableComparative[index].push(valor);
        newTableComparative[index].push(valor2);
      } else {
        valor = parseFloat(arrayFiltradoComparative[index].slice(posMedidaComparative - 1, posMedidaComparative));
        valor2 = parseFloat(arrayFiltradoComparative[index].slice(posMedidaComparative, posMedidaComparative + 1));
        newFiltradoComparative[index].push(parseFloat(arrayFiltradoComparative[index].slice(posMedidaComparative, posMedidaComparative + 1)));
        newTableComparative[index].push(valor);
        newTableComparative[index].push(valor2);
      }
    }
    this.tableValueComparative = newTableComparative;
    return newFiltradoComparative;
  }

  changeSelectorComparative() {
    this.inactiveButtonComparative = !(this.selectToChipsComparative.some(e => e.tipo === 'A') && this.selectToChipsComparative.some(e => e.tipo === 'P'));
    if (!this.inactiveButtonComparative) {
      this.graficarComparativo();
    }
  }

  //botón graficar
  graficarComparativo(): void {
    this.alertMessageComparative = false;
    let itemSearch = this.formGraficarComparative?.get("cboMedida")?.value + this.formGraficarComparative?.get("cboOrden")?.value;
    this.nameGraphicComparative = this.formGraficarComparative?.get("cboMedida")?.value;
    let posMedida = this.medida.findIndex((e: any) => e === itemSearch);
    if (posMedida == -1) {
      // no selecciono medida | medida seleccionada no existe...
      return;
    }

    // process.
    let aFiltro = [...this.selectToChipsComparative];
    aFiltro.unshift(ITEM_PERU);
    aFiltro.push({ code: posMedida, valor: this.formGraficarComparative?.get("cboOrden")?.value, tipo: "G" });
    let dataChart = Utilidades.orderArray(this.getDataLeaked(aFiltro), 0);
    let dataColumnChart = Utilidades.procesarDataChart(dataChart);
    this.columnChartComparative = Graficas.generateColumnChart(dataColumnChart);
    //grafica de linea
    this.lineChartComparative = Graficas.generateLineChart(dataColumnChart, true);
    //grafica table
    this.tableHtmlComparative = Graficas.generateTable(this.tableValueComparative, this.formGraficarComparative?.get("cboMedida")?.value);
  }
}