import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { GrafhicsService } from '../../services/graphics.service';
import { IndicadorChildToParentService } from '../../services/graficas/indicador-child-to-parent.service';

import * as Highcharts from 'highcharts';
import { Utilidades } from 'src/app/utils/utilidades';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';



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
  selector: 'app-grafhics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GrafhicsComponent implements OnInit {

  date: any;
  unidadMedida?: string[];
  unidadMedida2?: string[];
  unidadMedida3?: string[];
  codes: any;
  lineChart: Chart = new Chart();
  areaChart: Chart = new Chart();
  columnChart: Chart = new Chart();
  barChart: Chart = new Chart();
  donutChart: Chart = new Chart();
  array_donut : any = [];
  array_donut2 : any = [];
  array_donut3 : any = [];
  array_donutFour: any = [];
  company: any = [];
  years: any = [];
  dataSeries: any = [];
  nombreIndicator?: string;

  obtenerData: any = [];

  mostrarSubpartida = false;
  filterOne: any;
  filterTwo: any;

  selectedOption: string = 'País Destino';

  constructor(
    private graphicsService: GrafhicsService,
    private route: ActivatedRoute,
    private childToParentService: IndicadorChildToParentService,
    private _fb: FormBuilder
  ) {
    this.buildFormForYears();
    this.buildFormForCompany();
    this.buildFormFechaFirma();
    this.buildFormAcuerdos();
    //this.buildFormForYearsAndMes()
  }
  filteredDatos?: any[];
  listarTodo() {
    location.reload();
  }


  ngOnInit(): void {



    this.codes = this.route.snapshot.paramMap.get('code');
    localStorage.setItem("param", JSON.stringify({ graphic: this.codes }));
    this.childToParentService.onChangeIndicador$.next(this.codes);
    this.getIndicatorByCode(this.codes);

  }
  mostrarContenedorControl() {
    this.mostrarSubpartida = true;
  }
  ocultarContenedorControl() {
    this.mostrarSubpartida = false;
  }
  private getIndicatorByCode(code: string) {
    this.graphicsService.getIndicatorByCode(code).subscribe(
      (response) => {


        // this.obtenerData=response.data[0].serie
        if (code == '2.5.3') {
          console.log(response)

          this.generateDonutChart2(response.data[0].series);
          this.generateDonutChart3(response.data[1].series);
          
          this.unidadMedida = this.generateHead2(response.data[0].dimensiones);
          
          this.nombreIndicator = response.nombreIndicador;

          this.generateBarChart2(response.data[0].series);
          this.generateColumnChart2(response.data[0].series);
          this.generateLineChart2(response.data[0].series);
          this.generateAreaChart2(response.data[0].series);



        }
        if (code == '1.1.1' || code == '3.13.1' || code == '3.13.2' || code == '3.13.3'
          || code == '3.13.4' || code == '5.2' || code == '5.3' || code == '2.1'
          || code == '1.1.1' || code == '1.1.2' || code == '1.1.3' || code == '2.3.1'
          || code == '2.3.2' || code == '2.4.2' || code == '2.12') {

          this.unidadMedida = this.generateHead(response.dimensiones);
          this.unidadMedida2 = this.generateHead3(response.dimensiones);
          this.unidadMedida3=this.generateHead4(response.dimensiones);
          this.generateDonutChart(response.series);
          this.generateDonutChart4(response.series);
          console.log(response.series);

          this.dataSeries = response.series;
          console.log(this.dataSeries)
          this.company = this.getData(response.series, 1);
          this.years = this.getData(response.series, 0);
          console.log(this.years)


          this.nombreIndicator = response.nombreIndicador;
          this.generateBarChart(response.series);
          this.generateColumnChart(response.series);
          this.generateLineChart(response.series);
          this.generateAreaChart(response.series);
        }

      },
      (error) => {

        Utilidades.getMensajeModal('Indicador No existe', 'info');
      },
    );
  }
  
  filterByYearAndCompany(filters: {
    startYear?: number,
    endYear?: number,
    company?: string
  }) {

    var array_datos: any = [];

    array_datos = this.dataSeries.filter((serie: any) => {
      return ((filters.startYear === undefined || filters.startYear === 0) ? true : serie[0] >= filters.startYear) &&
        ((filters.endYear === undefined || filters.endYear === 0) ? true : serie[0] <= filters.endYear) &&
        ((filters.company === undefined || filters.company === '') ? true : serie[1] === filters.company);
    });

    console.log(array_datos); // Verificar los datos filtrados

    this.generateDonutChart(array_datos);
    this.generateBarChart(array_datos);
    this.generateColumnChart(array_datos);
    this.generateAreaChart(array_datos);
    this.generateLineChart(array_datos);
  }

  filterByYearAndFechaFirma(filters: {
    startYear?: number,
    endYear?: number,
    acuerdos?: string
  }) {
    var array_datos: any = [];
    var modifiedArrayDatos = this.dataSeries.map((serie: any) => {
      const fecha = serie[0].replace(/-/g, ''); // Elimina el guión ("-")
      return [parseInt(fecha), serie[1], serie[2]];
    });

    console.log(modifiedArrayDatos)

    array_datos = modifiedArrayDatos.filter((serie: any) => {
      return ((filters.startYear === undefined || filters.startYear === 0) ? true : serie[0] >= filters.startYear) &&
        ((filters.endYear === undefined || filters.endYear === 0) ? true : serie[0] <= filters.endYear) &&
        ((filters.acuerdos === undefined || filters.acuerdos === '') ? true : serie[1] === filters.acuerdos);
    });
    for (let i = 0; i < array_datos.length; i++) {
      const yearMonth = String(array_datos[i][0]);
      const year = yearMonth.substring(0, 4);
      const month = yearMonth.substring(4);
      const formattedYearMonth = year + '-' + month;
      array_datos[i][0] = formattedYearMonth;
    }

    console.log(array_datos)

    this.generateDonutChart(array_datos);
    this.generateBarChart(array_datos);
    this.generateColumnChart(array_datos);
    this.generateAreaChart(array_datos);
    this.generateLineChart(array_datos);


  }





  private generateDonutChart(series: any) {

    var serie = this.generateSerieDonutChart(series);
    var array_categoryNoRepetido = this.generateCategory(series);

    this.array_donut = [];
    for (let index = 0; index < array_categoryNoRepetido.length; index++) {
      this.donutChart = this.getDonutChart(serie[index]);

      var new_array: any[] = [];

      new_array.push(this.donutChart);
      new_array.push(serie[index]);
      new_array.push(array_categoryNoRepetido[index]);
      this.array_donut.push(new_array);


    }

  }
  private generateDonutChart2(series: any) {

    var serie = this.generateSerieDonutChart2(series);
    var array_categoryNoRepetido = this.generateCategory2(series);

    this.array_donut2 = [];
    for (let index = 0; index < array_categoryNoRepetido.length; index++) {
      this.donutChart = this.getDonutChart(serie[index]);

      var new_array2: any[] = [];

      new_array2.push(this.donutChart);
      new_array2.push(serie[index]);
      new_array2.push(array_categoryNoRepetido[index]);
      this.array_donut2.push(new_array2);


    }

  }

  private generateDonutChart3(series: any) {

    var serie = this.generateSerieDonutChart3(series);
    var array_categoryNoRepetido = this.generateCategory3(series);

    this.array_donut3 = [];
    for (let index = 0; index < array_categoryNoRepetido.length; index++) {
      this.donutChart = this.getDonutChart(serie[index]);

      var new_array3: any[] = [];

      new_array3.push(this.donutChart);
      new_array3.push(serie[index]);
      new_array3.push(array_categoryNoRepetido[index]);
      this.array_donut3.push(new_array3);


    }
    

  }
  private generateDonutChart4(series: any) {

    var serie = this.generateSerieDonutChart4(series);
    var array_categoryNoRepetido = this.generateCategory4(series);

    this.array_donutFour = [];
    for (let index = 0; index < array_categoryNoRepetido.length; index++) {
      this.donutChart = this.getDonutChart(serie[index]);

      var new_array4: any[] = [];

      new_array4.push(this.donutChart);
      new_array4.push(serie[index]);
      new_array4.push(array_categoryNoRepetido[index]);
      this.array_donutFour.push(new_array4);


    }
    

  }

  private getDonutChart(series: any[]) {
    return new Chart({
      chart: {
        type: 'pie',
        plotShadow: false,
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          innerSize: '85%',
          borderWidth: 40,
          borderColor: '',
          slicedOffset: 20,
          dataLabels: {
            enabled: false,
          },
          showInLegend: true
        },
      },
      title: {
        floating: false,
        text: '',
      },
      series: [
        {
          type: 'pie',
          data: series,
        },
      ],
    });

  }

  
  private generateBarChart(series: any) {
    this.barChart = new Chart({
      chart: {
        type: 'bar'
      },
      title: {
        text: this.nombreIndicator,
        align: 'center'
      },
      xAxis: {
        categories: this.generateCategory(series),
        title: {
          text: null
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: '',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        },
        tickInterval: 1
      },
      tooltip: {
        valueSuffix: ''
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      credits: {
        enabled: false
      },
      series: this.generateSerie(series, 'bar')
    })
    return this.barChart;
  }
  private generateBarChart2(series: any) {
    this.barChart = new Chart({
      chart: {
        type: 'bar'
      },
      title: {
        text: this.nombreIndicator,
        align: 'center'
      },
      xAxis: {
        categories: this.generateCategory2(series),
        title: {
          text: null
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: '',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        },
        tickInterval: 1
      },
      tooltip: {
        valueSuffix: ''
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      credits: {
        enabled: false
      },
      series: this.generateSerie2(series, 'bar')
    })
    return this.barChart;
  }
  private generateColumnChart(series: any) {
    this.columnChart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: this.nombreIndicator,
        align: 'center'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: this.generateCategory(series),
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: this.generateSerie(series, 'column')
    });
  }
  private generateColumnChart2(series: any) {
    this.columnChart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: this.nombreIndicator,
        align: 'center'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: this.generateCategory2(series),
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: this.generateSerie2(series, 'column')
    });
  }


  private generateLineChart(series: any) {
    this.lineChart = new Chart({
      title: {
        text: this.nombreIndicator,
        align: 'center'
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        accessibility: {
          rangeDescription: `Range: ${parseFloat(this.generateRange(series)[0])} to ${parseFloat(this.generateRange(series)[this.generateRange(series).length - 1])}`
        },
        tickInterval: 1
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: parseFloat(this.generateRange(series)[0])
        }
      },
      series: this.generateSerieLine(series, 'line'),

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    });
  }
  private generateLineChart2(series: any) {
    this.lineChart = new Chart({
      title: {
        text: this.nombreIndicator,
        align: 'center'
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        accessibility: {
          rangeDescription: `Range: ${parseFloat(this.generateRange(series)[0])} to ${parseFloat(this.generateRange(series)[this.generateRange(series).length - 1])}`
        },
        tickInterval: 1
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: parseFloat(this.generateRange(series)[0])
        }
      },
      series: this.generateSerieLine2(series, 'line'),

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    });
  }

  private generateAreaChart(series: any) {
    this.areaChart = new Chart({
      chart: {
        type: 'area'
      },
      credits: {
        enabled: false
      },
      title: {
        text: this.nombreIndicator,
        align: 'center'
      },
      xAxis: {
        allowDecimals: false,
        accessibility: {
          rangeDescription: `Range: ${parseFloat(this.generateRange(series)[0])} to ${parseFloat(this.generateRange(series)[this.generateRange(series).length - 1])}`
        }
      },
      yAxis: {
        title: {
          text: ''
        },
      },
      tooltip: {
        pointFormat: '{series.name} <b>{point.y:,.0f}</b><br/>en {point.x}'
      },
      plotOptions: {
        area: {
          pointStart: parseFloat(this.generateRange(series)[0]),
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        }
      },
      series: this.generateSerieLine(series, 'area'),
    });
  }
  private generateAreaChart2(series: any) {
    this.areaChart = new Chart({
      chart: {
        type: 'area'
      },
      credits: {
        enabled: false
      },
      title: {
        text: this.nombreIndicator,
        align: 'center'
      },
      xAxis: {
        allowDecimals: false,
        accessibility: {
          rangeDescription: `Range: ${parseFloat(this.generateRange(series)[0])} to ${parseFloat(this.generateRange(series)[this.generateRange(series).length - 1])}`
        }
      },
      yAxis: {
        title: {
          text: ''
        },
      },
      tooltip: {
        pointFormat: '{series.name} <b>{point.y:,.0f}</b><br/>en {point.x}'
      },
      plotOptions: {
        area: {
          pointStart: parseFloat(this.generateRange(series)[0]),
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        }
      },
      series: this.generateSerieLine2(series, 'area'),
    });
  }
  private generateCategory(data: any[]) {
    var array_category: any[] = [...new Set(data.map(e => e[1]))]; // unico
    return array_category;
  }
  private generateCategory2(data: any[]) {
    var array_category: any[] = [...new Set(data.map(e => e[2]))]; // unico
    return array_category;
  }
  private generateCategory3(data: any[]) {
    var array_category: any[] = [...new Set(data.map(e => e[3]))]; // unico
    return array_category;
  }
  private generateCategory4(data: any[]) {
    var array_category: any[] = [...new Set(data.map(e => e[1]))]; // unico
    
    return array_category;
  }
 
  private generateSerieDonutChart(series: any[]) {
    //["anio", "nombre", "valor"]]

    var array_name_categories: any[] = [...new Set(series.map(serie => serie[1]))];


    var aData: any = [];

    array_name_categories.forEach((category) => {
      aData.push([]);

      series.filter((serie) => {
        if (serie[1] == category) {
          aData[aData.length - 1].push({ name: serie[0], y: parseFloat(serie[2]) });
        }
      });

    })

    console.log(aData)
    return aData;
  }
  
  private generateSerieDonutChart2(series: any[]) {
    //["anio", "nombre", "valor"]]

    var array_name_categories: any[] = [...new Set(series.map(serie => serie[2]))];


    var aData: any = [];

    array_name_categories.forEach((category) => {
      aData.push([]);

      series.filter((serie) => {
        if (serie[2] == category) {
          aData[aData.length - 1].push({ name: serie[0],x:serie[1], y: parseFloat(serie[3]) });
        }
      });

    })
   
   
    console.log(aData)
    return aData;
  }
  private generateSerieDonutChart3(series: any[]) {
    //["anio", "nombre", "valor"]]

    var array_name_categories: any[] = [...new Set(series.map(serie => serie[3]))];


    var aData: any = [];

    array_name_categories.forEach((category) => {
      aData.push([]);

      series.filter((serie) => {
        if (serie[3] == category) {
          aData[aData.length - 1].push({ name: serie[0],x:serie[1] ,y: parseFloat(serie[4]) });
        }
      });

    })
   
   
    console.log(aData)
    return aData;
  }

  private generateSerieDonutChart4(series: any[]) {
    //["anio", "nombre", "valor"]]

    var array_name_categories: any[] = [...new Set(series.map(serie => serie[4]))];


    var aData: any = [];

    array_name_categories.forEach((category) => {
      aData.push([]);

      series.filter((serie) => {
        if (serie[4] == category) {
          aData[aData.length - 1].push({ name: serie[0],x:serie[2], y: parseFloat(serie[5]) });
        }
      });

    })

    console.log(aData)
    return aData;
  }
  private generateSerie(series: any[], type: string) {
    var arreglo: any[] = [];
    var arregloAnios: any[] = [];
    var categories: any[] = [];

    for (let index = 0; index < series.length; index++) {
      if (arregloAnios.indexOf(series[index][0]) == -1) {
        arregloAnios.push(series[index][0]);
      }
      if (categories.indexOf(series[index][1]) == -1) {
        categories.push(series[index][1]);
      }
    }

    for (let ind = 0; ind < arregloAnios.length; ind++) {
      var arregloData: any[] = [];
      for (let index = 0; index < categories.length; index++) {
        arregloData.push(0.0);
      }
      for (let f = 0; f < series.length; f++) {
        if (series[f][0] == arregloAnios[ind]) {
          arregloData[categories.indexOf(series[f][1])] = parseFloat(series[f][2]);
        }
      }

      arreglo.push({ type: type, name: `${arregloAnios[ind]}`, data: arregloData, });
    }

    //console.log("ver serie ***")
    console.log(arreglo);
    return arreglo;
  }
  private generateSerie2(series: any[], type: string) {
    var arreglo: any[] = [];
    var arregloAnios: any[] = [];
    var categories: any[] = [];

    for (let index = 0; index < series.length; index++) {
      if (arregloAnios.indexOf(series[index][0]) == -1) {
        arregloAnios.push(series[index][0]);
      }
      if (categories.indexOf(series[index][2]) == -1) {
        categories.push(series[index][2]);
      }
    }

    for (let ind = 0; ind < arregloAnios.length; ind++) {
      var arregloData: any[] = [];
      for (let index = 0; index < categories.length; index++) {
        arregloData.push(0.0);
      }
      for (let f = 0; f < series.length; f++) {
        if (series[f][0] == arregloAnios[ind]) {
          arregloData[categories.indexOf(series[f][2])] = parseFloat(series[f][3]);
        }
      }

      arreglo.push({ type: type, name: `${arregloAnios[ind]}`, data: arregloData, });
    }

    //console.log("ver serie ***")
    console.log(arreglo);
    return arreglo;
  }
  private generateSerieLine(data: any[], type: string) {
    var array_anios: any[] = [...new Set(data.map((e) => e[0]))]; // unico[2022,2021]
    var categories: any[] = [...new Set(data.map((u) => u[1]))]; //lista de categorias
    var array_serie: any[] = [];
    categories.forEach((e) => {
      var aData: any[] = [];
      array_anios.forEach((r) => {
        aData.push(0.0);
      });
      data.filter((s) => {
        if (s[1] == e) {
          aData[array_anios.indexOf(s[0])] = parseFloat(s[2]);
        }
      });
      array_serie.push({ type: type, name: `${e}`, data: aData });
    });
    console.log(array_serie)
    return array_serie;
  }
  private generateSerieLine2(data: any[], type: string) {
    var array_anios: any[] = [...new Set(data.map((e) => e[0]))]; // unico[2022,2021]
    var categories: any[] = [...new Set(data.map((u) => u[2]))]; //lista de categorias
    var array_serie: any[] = [];
    categories.forEach((e) => {
      var aData: any[] = [];
      array_anios.forEach((r) => {
        aData.push(0.0);
      });
      data.filter((s) => {
        if (s[2] == e) {
          aData[array_anios.indexOf(s[0])] = parseFloat(s[3]);
        }
      });
      array_serie.push({ type: type, name: `${e}`, data: aData });
    });
    console.log(array_serie)
    return array_serie;
  }
  private generateRange(data: any[]) {
    var array_range: any[] = [...new Set(data.map(e => e[0]))]; // unico
    return array_range;
  }

  private generateHead(data: any) {
    var newData: any = [];
    newData.push(data[0]);
    newData.push(data[1]);
    return newData;
  }
  private generateHead2(data: any) {
    var newData: any = [];
    newData.push(data[0]);
    newData.push(data[1]);
    newData.push(data[3]);
    return newData;
  }
  private generateHead3(data: any) {
    var newData: any = [];
    newData.push(data[0]);
    newData.push(data[2]);
    return newData;
  }
  private generateHead4(data: any) {
    var newData: any = [];
    newData.push(data[0]);
    newData.push(data[3]);
    newData.push(data[5]);
    return newData;
  }
  private getData(data: any[], position: number) {
    var array: any[] = [...new Set(data.map(e => e[position].toString()))];
    return array;
  }


  public formForYears!: FormGroup
  private formForYearsSubscription!: Subscription

  private buildFormForYears(): void {
    this.formForYears = this._fb.group({
      start: [''],
      end: [''],
    })
    this.formForYearsSubscription = this.formForYears.valueChanges.subscribe((value) => {
      let startDate = value.start ? new Date(value.start).getFullYear() : null;
      let endDate = value.end ? new Date(value.end).getFullYear() : null;

      if (startDate && endDate) {
        this.filterByYearAndCompany({
          startYear: startDate,
          endYear: endDate,
          company: this.formForCompany.get('company')?.value
        });
      }
    });
  }

  public formForCompany!: FormGroup
  private formForCompanySubscription!: Subscription


  private buildFormForCompany(): void {
    this.formForCompany = this._fb.group({
      company: ['']
    });

    // Suscripción para cambios en el control de compañía
    this.formForCompanySubscription = this.formForCompany.valueChanges.subscribe((value) => {
      let company = value.company;

      if (company) {
        let startDate = this.formForYears.get('start')?.value ? new Date(this.formForYears.get('start')?.value).getFullYear()! : undefined;
        let endDate = this.formForYears.get('end')?.value ? new Date(this.formForYears.get('end')?.value).getFullYear()! : undefined;

        console.log(startDate)
        console.log(endDate)
        this.filterByYearAndCompany({
          startYear: startDate,
          endYear: endDate,
          company: company
        });
      }
    });
  }

  public formForFechaFirma!: FormGroup;
  private formForFechaFirmaSubscription!: Subscription
  private buildFormFechaFirma(): void {
    this.formForFechaFirma = this._fb.group({
      start: [''],
      end: [''],


    });
    this.formForFechaFirmaSubscription = this.formForFechaFirma.valueChanges.subscribe((value) => {
      console.log(value);

      // obtener la fecha de inicio del rango
      let startDateMonth = value.start ? new Date(value.start).getMonth() + 1 : null;
      let startDateYear = value.start ? new Date(value.start).getFullYear() : null;
      //obtener la fecha fina del rango
      let endtDateMonth = value.end ? new Date(value.end).getMonth() + 1 : null;
      let endDateYear = value.end ? new Date(value.end).getFullYear() : null;

      if (startDateMonth && startDateYear && endtDateMonth && endDateYear) {
        let startMonth = startDateMonth;
        let formattedStartMonth = startMonth < 10 ? '0' + startMonth : startMonth;
        let startYear = startDateYear;

        let endMonth = endtDateMonth
        let formattedEndMonth = endMonth < 10 ? '0' + endMonth : endMonth;
        let endYear = endDateYear;

        let yearAndMonthStart = parseInt(+startYear + '' + formattedStartMonth)
        let yerarAndMonthEnd = parseInt(+endYear + '' + formattedEndMonth)


        this.filterByYearAndFechaFirma({
          startYear: yearAndMonthStart,
          endYear: yerarAndMonthEnd,
          acuerdos: this.formForFechaFirma.get('acuerdos')?.value

        })


      }

    })

  }


  public formForAcuerdos !: FormGroup;
  private formForAcuerdosSubscription!: Subscription;
  private buildFormAcuerdos(): void {
    this.formForAcuerdos = this._fb.group({
      acuerdos: ['']
    })
    this.formForAcuerdosSubscription = this.formForAcuerdos.valueChanges.subscribe((value) => {
      let acuerdos = value.acuerdos;

      let startDateMonth = this.formForFechaFirma.get('start')?.value ? new Date(this.formForFechaFirma.get('start')?.value).getMonth() + 1! : undefined;
      let startDateYear = this.formForFechaFirma.get('start')?.value ? new Date(this.formForFechaFirma.get('start')?.value).getFullYear()! : undefined;

      let endtDateMonth = this.formForFechaFirma.get('end')?.value ? new Date(this.formForFechaFirma.get('end')?.value).getMonth() + 1! : undefined;
      let endDateYear = this.formForFechaFirma.get('end')?.value ? new Date(this.formForFechaFirma.get('end')?.value).getFullYear()! : undefined;



      if (startDateMonth && startDateYear && endtDateMonth && endDateYear) {
        let startMonth = startDateMonth;
        let formattedStartMonth = startMonth < 10 ? '0' + startMonth : startMonth;
        let startYear = startDateYear;

        let endMonth = endtDateMonth
        let formattedEndMonth = endMonth < 10 ? '0' + endMonth : endMonth;
        let endYear = endDateYear;

        let yearAndMonthStart = parseInt(+startYear + '' + formattedStartMonth)
        let yerarAndMonthEnd = parseInt(+endYear + '' + formattedEndMonth)
        if (acuerdos) {

          this.filterByYearAndFechaFirma({
            startYear: yearAndMonthStart,
            endYear: yerarAndMonthEnd,
            acuerdos: acuerdos

          });
        }
      }
    });

  }


  public get startYearForInput(): number {
    return this.years[0] || 0;
  }
  public get finishYearForInput(): number {
    return this.years[this.years.length - 1] || 0;
  }

  public get startMesForInput(): number {
    return this.years[0] || 0;
  }
  public get finishMesForInput(): number {
    return this.years[this.years.length - 1] || 0;
  }



  ngOnDestroy(): void {
    this.formForYearsSubscription.unsubscribe();
    this.formForCompanySubscription.unsubscribe();
    this.formForFechaFirmaSubscription.unsubscribe();
    this.formForAcuerdosSubscription.unsubscribe();
    // this.formForYearsAndMesSubscription.unsubscribe();
  }


}

