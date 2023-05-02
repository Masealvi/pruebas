import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Utilidades } from 'src/app/utils/utilidades';
import { IndicadorMultilateralService } from '../../services/indicador-multilateral.service';
import { FormControl } from '@angular/forms';
import { Chart } from 'angular-highcharts';
import { Graficas } from 'src/app/utils/graficas';
import { SendCodeService } from '../../services/tab/send-code.service';
import { KEY_PARAM_ML } from 'src/app/national/tab-main-n/config/config';
import { ITEM_PERU, ITEM_TODOS } from 'src/app/utils/constantes';

@Component({
  selector: 'app-world-comparison',
  templateUrl: './world-comparison.component.html',
  styleUrls: ['./world-comparison.component.css']
})
export class WorldComparisonComponent implements OnInit {
  alertMessageWorld: boolean = true;
  inactiveButtonWorld: boolean = true;
  loadingworld: boolean = true;
  codesWorld: any;
  yearsWorld: any;
  countriesWorld: any;

  lineChartWorld: Chart = new Chart();
  barChartWorld: Chart = new Chart();
  tableHtmlWorld: any;

  dataComparaMundial: any;

  paisesWorld = new FormControl();
  aniosWorld = new FormControl();

  constructor(
    private indicadorMultilateralService: IndicadorMultilateralService,
    private route: ActivatedRoute,
    private sendCodeService: SendCodeService,
  ) { }

  ngOnInit(): void {
    this.codesWorld = this.route.snapshot.paramMap.get('codigo');
    localStorage.setItem(KEY_PARAM_ML, JSON.stringify({ graphic: this.codesWorld }));
    this.sendCodeService.onChangeIndicador$.next(this.codesWorld);
    this.getIndicatorMultilateralWorld(this.codesWorld);
  }

  private getIndicatorMultilateralWorld(code: string) {
    this.indicadorMultilateralService.getIndicatorMultilateralByCode(code).subscribe(
      (response) => {
        this.dataComparaMundial = response.data[1];
        this.yearsWorld = Utilidades.getYears(this.dataComparaMundial.series, 0)
        this.countriesWorld = Utilidades.getCountries(this.dataComparaMundial.series, 1);
        this.countriesWorld.unshift(ITEM_TODOS);
        this.loadingworld = this.dataComparaMundial !== null ? false : true;
      }
    );
  }

  //#CHIPS
  selectable = true;
  removable = true;
  selectToChips: any[] = [];

  removeChip(seleccionado: any) {
    Utilidades.removeChip(this.selectToChips, seleccionado, this.paisesWorld, this.aniosWorld);
    this.inactiveButtonWorld = !(this.selectToChips.some(e => e.tipo === 'A') && this.selectToChips.some(e => e.tipo === 'P'));
    if (!this.inactiveButtonWorld) {
      this.graficarWorld();
    } else {
      this.alertMessageWorld = true;
    }
  }
  //END CHIPS

  getFiltrosAplicados(code: any, value: any, strTipo: string) {
    if (code == ITEM_TODOS.code) { // ALL
      let _index = this.paisesWorld.value.findIndex((e: any) => e === ITEM_TODOS.name);
      // retirar paises de select
      this.paisesWorld.value.length = 0;
      // retirar los paises de chips
      this.selectToChips = this.selectToChips.filter(e => e.tipo !== strTipo);
      // Seleccionado
      if (_index > -1) {
        this.countriesWorld.forEach((e: any) => {
          this.paisesWorld.value.push(e.name)
          this.selectToChips.push({ code: e.code, valor: e.name, tipo: strTipo });
        });
      }
      this.paisesWorld.patchValue(this.paisesWorld.value); // check | uncheck

      if (this.paisesWorld.value.length > 0) {
        // retirar el pais ALL
        _index = this.paisesWorld.value.findIndex((e: any) => e === ITEM_TODOS.name);
        this.paisesWorld.value.splice(_index, 1);
        // retirar de chips
        _index = this.selectToChips.findIndex((e: any) => e.valor === ITEM_TODOS.name);
        this.selectToChips.splice(_index, 1);
      }
    } else {
      let resultado = this.selectToChips.find(e => e.code === code) ?? null;
      if (resultado == null) {
        this.selectToChips.push({ code: code, valor: value, tipo: strTipo });
      } else {
        this.selectToChips = this.selectToChips.filter(e => e.code !== code);
      }
    }
    this.inactiveButtonWorld = !(this.selectToChips.some(e => e.tipo === 'A') && this.selectToChips.some(e => e.tipo === 'P'));
    if (!this.inactiveButtonWorld) {
      this.graficarWorld();
    }
  }

  graficarWorld(): void {
    this.alertMessageWorld = false;
    // process.
    let aFiltro = [...this.selectToChips];
    aFiltro.unshift(ITEM_PERU);
    let dataChart = this.getDataLeaked(aFiltro);
    this.barChartWorld = Graficas.generateBarChart(dataChart);
    //grafica de linea
    this.lineChartWorld = Graficas.generateLineChart(dataChart, false);
    //grafica table
    this.tableHtmlWorld = Graficas.generateTable3(dataChart);
  }

  getDataLeaked(data: any[]) {
    let arrayFiltradoWorld: any[] = [];
    let arrayPaisWorld: any[] = [];
    let arrayAnioWorld: any[] = [];
    let aDataWorld: any[] = [];
    let serieWorld = this.dataComparaMundial.series;

    for (let index = 0; index < data.length; index++) {
      if (data[index].tipo === 'P') {
        arrayPaisWorld.push(data[index].code);
      }
      if (data[index].tipo === 'A') {
        arrayAnioWorld.push(data[index].code);
      }
    }

    arrayPaisWorld.forEach((e) => {
      serieWorld.filter((s: any) => {
        if (s[2] == e) {
          aDataWorld.push(s);
        }
      });
    });

    arrayAnioWorld.forEach((e) => {
      aDataWorld.forEach((s) => {
        if (s[0] == e) {
          arrayFiltradoWorld.push(s);
        }
      });
    });
    return arrayFiltradoWorld;
  }

}
