import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IndicadorMultilateralService } from '../../services/indicador-multilateral.service';
import { Chart } from 'angular-highcharts';
import { SendCodeService } from '../../services/tab/send-code.service';
import { KEY_PARAM_ML } from 'src/app/national/tab-main-n/config/config';
import { Utilidades } from 'src/app/utils/utilidades';
import { Graficas } from 'src/app/utils/graficas';

import * as Highcharts from 'highcharts/highmaps';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);

import * as Highcharts2 from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import { DomSanitizer } from '@angular/platform-browser';
import { CODE_MULTILATERAL, COUNTRY_ISO_A3_TO_A2, ITEM_PERU } from 'src/app/utils/constantes';

HighchartsMore(Highcharts2);
HighchartsSolidGauge(Highcharts2);

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  value: any;
  loadingSummary?: boolean;
  formGraficar?: FormGroup;
  codes: any;
  dataSummary: any;
  category: any;
  years: number[] = [];
  yearsGlobal: number[] = [];
  mayor: number = 0;
  selectToGraphics: any[] = [];
  graphicGlobal: any[] = [];
  spiderChart: Chart = new Chart();
  barChartSummary2: Chart = new Chart();
  array_donut: any = [];

  public htmlGraficaBarra: any;

  totalGraficas = 10;//para semi donut de indicador 2 (RESUMEN)

  constructor(
    private indicadorMultilateralService: IndicadorMultilateralService,
    private route: ActivatedRoute,
    private sendCodeService: SendCodeService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) { this.crarFormulario(); }

  ngOnInit(): void {
    this.loadingSummary = true;
    let code: any = this.route.snapshot.paramMap.get('codigo');
    this.codes = code;
    localStorage.setItem(KEY_PARAM_ML, JSON.stringify({ graphic: this.codes }));
    this.sendCodeService.onChangeIndicador$.next(this.codes);
    this.getIndicatorMultilateral(code);
  }

  private crarFormulario(): void {
    this.formGraficar = this.fb.group({
      cboAnio: [],
      cboAnioGlobal: []
    });
  }

  private getIndicatorMultilateral(code: string) {
    this.indicadorMultilateralService.getIndicatorMultilateralByCode(code).subscribe(
      (response) => {
        this.dataSummary = response.data[0];
        if (code === CODE_MULTILATERAL.indicator1) {
          this.category = this.dataSummary.dimensiones.slice(5);
          this.getYear();
          this.graficar();
        } else if (code === CODE_MULTILATERAL.indicator2) {
          let categories = this.dataSummary.dimensiones.slice(3);
          this.genarateBarchartToSummary2(categories, this.getDataToBarChart(this.getDataLeakedDonutBarra()));
          this.init2(categories, this.getDataLeakedDonutBarra());
        } else if (code === CODE_MULTILATERAL.indicator3) {
          this.category = this.dataSummary.dimensiones.slice(3);
          this.years = Utilidades.getYears(this.dataSummary.series, 0);
          this.array_donut = Graficas.genarateDonutChart(this.category, this.dataSummary.series);
        }
        this.loadingSummary = this.dataSummary !== null ? false : true;
      });

  }

  getYear() {
    this.yearsGlobal = Utilidades.getYears(this.dataSummary.series, 0);
    for (let index = 0; index < this.yearsGlobal.length; index++) {
      if (this.yearsGlobal[index] > this.mayor) {
        this.mayor = this.yearsGlobal[index];
      }
    }
    this.years = [...this.yearsGlobal.filter((e) => e != this.mayor)];
    if (this.years != null && this.years.length > 0) {
      this.formGraficar?.get("cboAnio")?.setValue(this.years[0]);
      this.formGraficar?.get("cboAnioGlobal")?.setValue(this.yearsGlobal[0]);
    }
  }

  graficar() {
    this.selectToGraphics = [];
    this.graphicGlobal = [];
    let itemSearch = this.formGraficar?.get("cboAnio")?.value;
    let itemGlobal = this.formGraficar?.get("cboAnioGlobal")?.value;
    this.selectToGraphics.push({ code: itemSearch, valor: itemSearch, tipo: "A" });
    this.selectToGraphics.unshift({ code: this.mayor, valor: this.mayor, tipo: "A" });
    this.graphicGlobal.push({ code: itemGlobal, valor: itemGlobal, tipo: "A" });
    this.createChartBarra(this.getDataMejorPais());
    this.spiderChart = Graficas.genarateSpiderChart(this.category, this.getDataLeaked(this.selectToGraphics), 0, false);
    this.init(this.getDataLeakedGlobales(this.graphicGlobal));
  }

  getDataMejorPais() {
    let arrayDataPais: any[] = [];
    let seriePais = this.dataSummary.series;
    let mayorPais: number = 0;
    var arrayAnioPais: any[] = [...new Set(seriePais.map((e: any[]) => e[0]))];
    for (let index = 0; index < arrayAnioPais.length; index++) {
      if (arrayAnioPais[index] > mayorPais) {
        mayorPais = arrayAnioPais[index];
      }
    }
    let aData: any[] = [];
    seriePais.filter((s: any) => {
      if (s[0] == mayorPais) {
        aData.push(s.slice(1, 5));
      }
    });
    for (let index = 0; index < aData.length; index++) {
      let element = aData[index][3];
      if (element <= 5) {
        arrayDataPais.push(aData[index]);
      }
    }
    seriePais.filter((s: any) => {
      if (s[0] == mayorPais && s[2] == ITEM_PERU.code) {
        arrayDataPais.push(s.slice(1, 5));
      }
    });
    return arrayDataPais;
  }

  getDataLeaked(data: any[]) {
    let arrayAnioSummary: any[] = [];
    let aDataSummary: any[] = [];
    let serieSummary = this.dataSummary.series;
    var arrayPeruSummary: any[] = [...serieSummary.filter((e: any) => e[2] == ITEM_PERU.code)];

    for (let index = 0; index < data.length; index++) {
      if (data[index].tipo === 'A') {
        arrayAnioSummary.push(data[index].code);
      }
    }

    arrayAnioSummary.forEach((e) => {
      arrayPeruSummary.filter((s: any) => {
        if (s[0] == e) {
          aDataSummary.push(s);
        }
      });
    });
    return aDataSummary;
  }

  getDataLeakedDonutBarra() {
    let serieDonut = this.dataSummary.series;
    let mayorDonut: number = 0;
    var arrayAnioDonut: any[] = [...new Set(serieDonut.map((e: any[]) => e[0]))];
    for (let index = 0; index < arrayAnioDonut.length; index++) {
      if (arrayAnioDonut[index] > mayorDonut) {
        mayorDonut = arrayAnioDonut[index];
      }
    }
    let aDataDonut: any[] = [];
    serieDonut.filter((s: any) => {
      if (s[0] == mayorDonut && s[2] == ITEM_PERU.code) {
        aDataDonut = s.slice(3);
      }
    });
    aDataDonut = aDataDonut.map(e => {
      return parseFloat(e);
    });
    return aDataDonut;
  }

  getDataLeakedGlobales(data: any[]) {
    let arrayAnioGlobal: any[] = [];
    let aDataGlobal: any[] = [];
    let serieGlobal = this.dataSummary.series;

    for (let index = 0; index < data.length; index++) {
      if (data[index].tipo === 'A') {
        arrayAnioGlobal.push(data[index].code);
      }
    }
    arrayAnioGlobal.forEach((e) => {
      let code: any;
      let value: any;
      let name: any;
      serieGlobal.filter((s: any) => {
        if (s[0] == e) {
          code = s.slice(2, 3).toString();
          value = parseFloat(s.slice(4, 5));
          name = s.slice(1, 2).toString();
          aDataGlobal.push({ code: code, value: value, name: name });
        }
      });
    });
    return aDataGlobal;
  }
  /* INDICADOR 1 */
  /* Barra */
  private createChartBarra(aData: any[]) {
    const aScore: number[] = aData.map(e => Number(e[2]));
    const anchoTotal: number = Math.max(...aScore);
    const colNomPais = 0, colCodPais = 1, colRank = 3;
    let _html = "";
    aData.forEach((e, i) => {
      const _score = aScore[i];
      const _width = Number((_score * 100.00 / anchoTotal).toFixed(2)); // ancho de cada barra
      const _codPais = e[colCodPais];
      const _img = Object.entries(COUNTRY_ISO_A3_TO_A2).find(c => c[0] == _codPais)?.[1];

      _html += `
    <div style="width: ${_width}%; height: 40px; color: #fff; background-color: #DA291C; margin-top: 5px;">
      <div style="width: 100%; display: flex; flex-direction: row; align-items: center; padding-top: 8px">
          <span style="width: 50px; text-align: center; font-weight: bold; font-size: 18px;">
              ${e[colRank]}
          </span>
          <img src="./assets/flags/${_img}.svg" alt="Bandera de ${e[colNomPais]}"
              style="width:25px; height:25px; border: 2px solid #fff; border-radius: 50%;" />
          <span class="type-text" style="margin: 0 15px; font-size: 15px; font-weight: 500; flex: auto;" >${e[colNomPais]}</span>
          <span style="padding-right:10px; font-weight: bold; font-size: 18px;">${_score.toFixed(2)}</span>
      </div>
  </div>
  `;

    });
    // sanitizer.bypassSecurityTrustHtml es para que angular acepte stylos y clases
    // por seguridad lo tiende a bloquear con esto lo deja pasar...
    this.htmlGraficaBarra = this.sanitizer.bypassSecurityTrustHtml(_html);
  }
  /* Mapa */
  async init(data: any) {

    const topology = await fetch(
      'https://code.highcharts.com/mapdata/custom/world.topo.json'
    ).then(response => response.json());
    this.drawChart(this.getData(data), topology);
  }

  drawChart(data: any, topology: any) {
    Highcharts.mapChart('container1', this.generateGraficaMap(data, topology));
  }

  getData(data: any): any {
    return data;
  }

  generateGraficaMap(data: any, topology: any): any {
    return {
      chart: {
        map: topology,
        borderWidth: 0
      },

      credits: {
        enabled: false
      },

      colors: ['rgba(19,64,117,0.05)', 'rgba(19,64,117,0.2)', 'rgba(19,64,117,0.4)',
        'rgba(19,64,117,0.5)', 'rgba(19,64,117,0.6)'],

      title: {
        text: '',
        align: 'left'
      },

      mapNavigation: {
        enabled: true,
        buttonOptions: {
          align: 'right'
        }
      },

      mapView: {
        fitToGeometry: {
          type: 'MultiPoint',
          coordinates: [
            // Alaska west
            [-164, 54],
            // Greenland north
            [-35, 84],
            // New Zealand east
            [179, -38],
            // Chile south
            [-68, -55]
          ]
        }
      },

      legend: {
        title: {
          text: 'Ranking',
          style: {
            color: ( // theme
              Highcharts.defaultOptions &&
              Highcharts.defaultOptions.legend &&
              Highcharts.defaultOptions.legend.title &&
              Highcharts.defaultOptions.legend.title.style &&
              Highcharts.defaultOptions.legend.title.style.color
            ) || 'black'
          }
        },
        align: 'left',
        verticalAlign: 'bottom',
        floating: true,
        layout: 'vertical',
        valueDecimals: 0,
        backgroundColor: ( // theme
          Highcharts.defaultOptions &&
          Highcharts.defaultOptions.legend &&
          Highcharts.defaultOptions.legend.backgroundColor
        ) || 'rgba(255, 255, 255, 0.85)',
        symbolRadius: 0,
        symbolHeight: 14
      },

      colorAxis: {
        dataClasses: [{
          to: 30
        }, {
          from: 30,
          to: 60
        }, {
          from: 60,
          to: 90
        }, {
          from: 90,
          to: 120
        }, {
          from: 120
        }]
      },

      series: [{
        data: data,
        joinBy: ['iso-a3', 'code'],
        animation: true,
        name: 'Ranking',
        states: {
          hover: {
            color: '#a4edba'
          }
        },
        tooltip: {
          valueSuffix: ''
        },
        shadow: false
      }]
    }
  }

  /* INDICADOR 2*/
  private getDataToBarChart(data: number[]) {
    let suma: number = 0;
    for (let index = 0; index < data.length; index++) {
      suma += data[index];
    }
    let aData: number[] = [];
    data.forEach(e => {
      let valor: number;
      valor = (e * 100) / suma;
      aData.push(parseFloat(valor.toFixed(2)));
    });
    return aData;
  }
  /* Barra */
  private genarateBarchartToSummary2(name: any, data: any) {
    this.barChartSummary2 = new Chart({
      chart: {
        type: 'bar',
        marginTop: -230
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: false
      },
      xAxis: {
        categories: ['2021'],
        visible: false,
      },
      yAxis: {
        gridLineWidth: 0,
        min: 0,
        max: 100,
        height: 340,
        tickInterval: 10,
        title: {
          text: ''
        },
        labels: {
          formatter: function (e: any) {
            return e.value + ' %';
          }
        },
      },
      legend: {
        reversed: false,
        verticalAlign: 'middle',
        y: -35
      },
      plotOptions: {
        series: {
          stacking: 'normal',
          dataLabels: {
            enabled: false
          }
        }
      },
      series: this.genarteSerieBar(name, data),
    });
  }

  private genarteSerieBar(name: any, data: any) {
    let array: any[] = [];
    const aColors: string[] = [
      '#CFD236', '#7DC754', '#3948A4', '#1294E8', '#FF8249',
      '#e53935', '#4a148c', '#1976d2', '#00897b', '#ffab00'
    ];
    for (let index = 0; index < name.length; index++) {
      array.push({ name: name[index], data: [data[index]], color: aColors[index], pointWidth: 90 });
    }
    return array;
  }

  /*Semi donut*/
  private init2(categories: any, data: any) {
    const colors: string[] = [
      '#CFD236', '#7DC754', '#3948A4', '#1294E8', '#FF8249',
      '#e53935', '#4a148c', '#1976d2', '#00897b', '#ffab00'
    ];
    for (let i = 0; i < this.totalGraficas; i++) {
      this.generateSemiDonutChart(i, categories[i], data[i], colors[i]);
    }
  }

  private generateSemiDonutChart(graficaID: number, titulo: string, valor: number, color: string) {
    const _graphicID = 'chart-gauge' + graficaID;
    Highcharts2.chart(_graphicID, {
      chart: {
        type: 'solidgauge',
      },
      title: {
        text: titulo,
        y: 380,
      },
      credits: {
        enabled: false,
      },
      exporting: false,
      pane: {
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '85%'],
        size: '100%',
        background: {
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc',
        },
      },
      yAxis: {
        min: 0,
        max: 100,
        stops: [
          [1, color],
        ],
        minorTickInterval: null,
        tickAmount: 2,
        labels: {
          y: 16,
          formatter: function (e: any) {
            return e.value + ' %';
          }
        },
      },
      plotOptions: {
        solidgauge: {
          color: '#DDDF0D',
          dataLabels: {
            y: -10,
            borderWidth: 0,
            useHTML: true,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      series: [{
        name: null,
        data: [valor],
        dataLabels: {
          format: '<div style="text-align: center"><span style="font-size: 1rem">{y}%</span></div>',
        },
      }],
    } as any);
  }
}