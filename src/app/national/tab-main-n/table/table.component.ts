import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GrafhicsService } from '../../services/graphics.service';
import { IndicadorChildToParentService } from '../../services/graficas/indicador-child-to-parent.service';
import { PageEvent } from '@angular/material/paginator';
import { IndicadorTablas } from '../../interfaces/indicadorTable';
import { Datos } from '../../interfaces/fichaIndicador';
import { Utilidades } from 'src/app/utils/utilidades';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';


declare var require: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [GrafhicsService]
})
export class TableComponent implements OnInit {

  ocultarDiv = false;
  codes: string = '';
  public tableHead: IndicadorTablas[] = [];
  public tableBody: IndicadorTablas[][] = [];
  public tablePerson: Datos[] = [];
  public tableMedicion: IndicadorTablas[] = [];
  public tableReduccion: IndicadorTablas[] = [];
  public tableSerie2: IndicadorTablas[][] = [];
  public tableSerie3: IndicadorTablas[][] = [];
  public dataDate: any;
  public dataDate2: any;
  public dataTableSeries: IndicadorTablas[][] = [];
  dataGeiAll: any;
  dataFechaFirma: any;
  dataNameClass: any;
  dataEnterprise: any;
  dataEnterprise2: any;
  dataEmpresa: any;
  dataAcuerdo: any;
  dataFiltro3: any;
  dataFiltro4: any;
  dataFiltro5: any;
  gradosYtitulos: any;
  years: any = [];
  public page: number = 0;

  constructor(
    private graphicsService: GrafhicsService,
    private route: ActivatedRoute,
    private childToParentService: IndicadorChildToParentService,
    private _fb: FormBuilder

  ) {
    this.buildFormForYears()
    this.buildFormForCompany()
    this.buildFormdataGeiAll()
    this.buildFormForYears2()
    this.buildFormdataNameClass()
    this.buildFormdataEnterprise()
    this.buildFormForYears3()
    this.buildFormForPaisDestino()
    this.buildFormForSubpartida()
    this.buildFormFechaFirma()
    this.buildFormSistemaArmonizado()

  }

  ngOnInit(): void {

    let code: any = this.route.snapshot.paramMap.get('code');
    this.codes = code;
    localStorage.setItem("param", JSON.stringify({ graphic: code }));
    this.childToParentService.onChangeIndicador$.next(code);
    this.getIndicatorTableByCode(code);
  }

  private getIndicatorTableByCode(code: string) {
    this.graphicsService.getIndicatorByCodeTable(code).subscribe(
      (response) => {


        if (code == '2.1' || code == '3.13.1' || code == '3.13.2' || code == '3.13.4' || code == '3.13.3') {
          console.log(response)
          this.tableHead = response.dimensiones;
          this.tableBody = response.series;
          this.dataTableSeries = response.series;
          this.dataDate = this.getData(response.series, 1);
          this.dataEnterprise = this.getData(response.series, 0);
          this.dataFechaFirma = this.getData(response.series, 1);
          this.dataAcuerdo = this.getData(response.series, 3);
          this.dataDate2 = this.getData(response.series, 0);
          this.dataEnterprise2 = this.getData(response.series, 1);
        }
        if (code === '5.2' || code == '5.3') {
          this.tablePerson = response.data[0].dimensiones;
          this.tableMedicion = response.data[1].dimensiones;
          this.tableSerie2 = response.data[1].series;
          this.tableReduccion = response.data[2].dimensiones;
          this.tableSerie3 = response.data[2].series;
          this.tableBody = response.data[0].series;
          this.dataTableSeries = response.data[0].series;
          this.dataDate = this.getData(response.data[0].series, 0);
          console.log(this.tableBody);

          this.dataEnterprise = this.getData(response.data[0].series, 1);
          this.dataNameClass = this.getData(response.data[0].series, 7);
          this.dataGeiAll = this.getDataGeiAll(response.data[0].series, 8);

        } else if (code == '2.6') {
          this.tablePerson = response.data[0].dimensiones;
          this.tableBody = response.data[0].series;
          this.tableMedicion = response.data[1].dimensiones;
          this.tableSerie2 = response.data[1].series;
          this.dataDate = this.getData(response.data[0].series, 0);
          this.dataEnterprise = this.getData(response.data[0].series, 1);
        }
        if (code == '1.1.1' || code == '1.1.2' || code == '1.1.3') {

          this.tableHead = response.dimensiones;
          this.tableBody = response.series;
          this.dataDate2 = this.getData1(response.series, 0);
          this.dataEnterprise2 = this.getData1(response.series, 1);
          this.dataTableSeries = response.series;

        }
        if (code == '1.2' || code == '1.3' || code == '1.6' || code == '1.8'
          || code == '2.1.1' || code == '2.1.2' || code == '2.2.1' || code == '2.2.2'
          || code == '2.3.1' || code == '2.3.2' || code == '2.4.1' || code == '2.4.2'
          || code == '4.3.1' || code == '4.3.2' || code == '4.3.3' || code == '4.3.4'
          || code == '4.4' || code == '4.7' || code == '2.7.2') {

          this.tableHead = response.dimensiones;
          this.tableBody = response.series;
          this.dataTableSeries = response.series;
          this.dataDate2 = this.getData1(response.series, 0);
          this.dataEnterprise2 = this.getData1(response.series, 1);
          this.dataFiltro3 = this.getData1(response.series, 2);
          this.dataFiltro4 = this.getData(response.series, 12);
          this.dataFiltro5 = this.getData(response.series, 14);
          this.gradosYtitulos = this.getData(response.series, 5);
          console.log(response.series);

        } else if (code == '2.5.1' || code == '2.12') {
          this.tableHead = response.dimensiones;
          this.tableBody = response.series;
          this.dataTableSeries = response.series;
          this.dataDate = this.getData1(response.series, 1);
          this.dataDate2 = this.getData1(response.series, 0);
          this.dataEnterprise2 = this.getData1(response.series, 2);
          this.dataFiltro3 = this.getData1(response.series, 4);
          this.dataFiltro4 = this.getData(response.series, 6);
          this.dataFiltro5 = this.getData(response.series, 7);
          this.gradosYtitulos = this.getData(response.series, 8);
          this.dataAcuerdo = this.getData(response.series, 9);

        }


      },
      (error) => {
        Utilidades.getMensajeModal('Indicador No existe', 'info');
      }
    );
  }

  private getData(data: any[], position: number) {
    var array: any[] = [...new Set(data.map(e => e[position]))];
    return array;
  }
  private getData1(data: any[], position: number) {
    var array: any[] = [...new Set(data.map(e => e[position].toString()))];
    return array;
  }

  private getDataGei(data: any[], position: number) {
    var array: any[] = [...new Set(data.map(e => e[position].toString()))];
    console.log(array);
    let dataGEIFilter: any[] = [];
    array.forEach(e => {
      if (e === 3 || e === 4) {
        dataGEIFilter.push(e.toString());
      }
    });

    return dataGEIFilter;
  }

  private getDataGeiAll(data: any[], position: number) {
    var arrayNivelGestion: any[] = [...new Set(data.map(e => e[position].toString()))];

    return arrayNivelGestion;

  }

  filtroOne: any;
  filtroTwo: any;

  listarTodo() {
    location.reload();
  }

  filterByYearAndCompany(filters: {
    startYear?: number,
    endYear?: number,
    dataEnterprise?: string
  }) {


    if ((filters.startYear === 0 && filters.endYear === 0) || (filters.startYear === null && filters.endYear === null) ||
      (filters.dataEnterprise === undefined && filters.dataEnterprise === '')) {
      this.tableBody = this.dataTableSeries;

    } else if (this.codes == '3.13.2' || this.codes == '3.13.4' || this.codes == '3.13.3' || this.codes == '1.1.1'
      || this.codes == '1.1.2' || this.codes == '1.1.3' || this.codes == '1.2' || this.codes == '1.6' || this.codes == '1.8'
      || this.codes == '2.3.1' || this.codes == '2.3.2' || this.codes == '2.4.1' || this.codes == '2.4.2'
      || this.codes == '4.4' || this.codes == '2.7.2' || this.codes == '2.6') {
      this.tableBody = this.dataTableSeries.filter((serie: any) => {
        return ((filters.startYear === undefined || filters.endYear === 0) ? true : serie[0].toString() >= filters.startYear) &&
          ((filters.endYear === undefined || filters.endYear === 0) ? true : serie[0].toString() <= filters.endYear) &&
          ((filters.dataEnterprise === undefined || filters.dataEnterprise === '') ? true : serie[1] === filters.dataEnterprise);
      });


    } else if (this.codes == '3.13.1') {
      this.tableBody = this.dataTableSeries.filter((serie: any) => {
        return ((filters.startYear === undefined || filters.endYear === 0) ? true : serie[1].toString() >= filters.startYear) &&
          ((filters.endYear === undefined || filters.endYear === 0) ? true : serie[1].toString() <= filters.endYear) &&
          ((filters.dataEnterprise === undefined || filters.dataEnterprise === '') ? true : serie[0] === filters.dataEnterprise);
      });

    }


    else if (this.codes == '2.1') {

      var data=[];
      // Suponiendo que el array original está en la variable dataTableSeries
      const modifiedDataTableSeries = this.dataTableSeries.map((serie: any) => {
        const fecha = serie[1].replace(/-/g, ''); // Elimina el guión ("-")
        return [serie[0], fecha, serie[2], serie[3], serie[4]];
      });

      data = modifiedDataTableSeries.filter((serie: any) => {
        return ((filters.startYear === undefined || filters.endYear === 0) ? true : serie[1].toString() >= filters.startYear) &&
          ((filters.endYear === undefined || filters.endYear === 0) ? true : serie[1].toString() <= filters.endYear) &&
          ((filters.dataEnterprise === undefined || filters.dataEnterprise === '') ? true : serie[3] === filters.dataEnterprise);
      });

      this.tableBody = data.map((row: any[]) => {
        const fecha = row[1]; // Obtenemos la fecha sin guiones
        const formattedFecha = `${fecha.substr(0, 4)}-${fecha.substr(4, 2)}-${fecha.substr(6, 2)}`; // Agregamos los guiones
        return [row[0], formattedFecha, row[2], row[3], row[4]]; // Retornamos el sub-array con la fecha formateada
      });
     

      
    }
    /*
    else if (this.codes == '4.3.3' || this.codes == '4.3.4') {
      this.tableBody = this.dataTableSeries.filter((serie: any) => {
        return ((filtroOne === undefined || filtroOne === '') ? true : serie[12].toString() === filtroOne) &&
          ((filtroTwo === undefined || filtroTwo === '') ? true : serie[14].toString() === filtroTwo);
      });
    }
    */
  }
  //indicador 2.1
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
      let startDateDay = value.start ? new Date(value.start).getDay() : null;


      //obtener la fecha fina del rango
      let endtDateMonth = value.end ? new Date(value.end).getMonth() + 1 : null;
      let endDateYear = value.end ? new Date(value.end).getFullYear() : null;
      let endDateDay = value.end ? new Date(value.end).getDay() : null;

      if (startDateMonth && startDateYear && endtDateMonth && endDateYear && startDateDay && endDateDay) {
        let startMonth = startDateMonth;
        let formattedStartMonth = startMonth < 10 ? '0' + startMonth : startMonth;
        let startYear = startDateYear;

        let startDay = startDateDay;
        let formattedStartDay = startDay < 10 ? '0' + startDay : startDay;

        let endMonth = endtDateMonth
        let formattedEndMonth = endMonth < 10 ? '0' + endMonth : endMonth;
        let endYear = endDateYear;

        let endDay = endDateDay;
        let formattedEndDay = endDay < 10 ? '0' + endDay : endDay;

        let yearAndMonthStart = parseInt(+startYear + '' + formattedStartMonth + '' + formattedStartDay)
        let yerarAndMonthEnd = parseInt(+endYear + '' + formattedEndMonth + '' + formattedEndDay)

        console.log(yearAndMonthStart)
        console.log(yerarAndMonthEnd)

        this.filterByYearAndCompany({
          startYear: yearAndMonthStart,
          endYear: yerarAndMonthEnd,
          dataEnterprise: this.formForSistemaArmonizado.get('sistemaArmonizado')?.value,
          

        })


      }

    })

  }
  public formForSistemaArmonizado !: FormGroup;
  private formForSistemaArmonizadoSubscription!: Subscription;
  private buildFormSistemaArmonizado(): void {
    this.formForSistemaArmonizado = this._fb.group({
      sistemaArmonizado: ['']
    })
    this.formForSistemaArmonizadoSubscription = this.formForSistemaArmonizado.valueChanges.subscribe((value) => {
      let sistemaArmonizado = value.sistemaArmonizado;

      let startDateMonth = this.formForFechaFirma.get('start')?.value ? new Date(this.formForFechaFirma.get('start')?.value).getMonth() + 1! : undefined;
      let startDateYear = this.formForFechaFirma.get('start')?.value ? new Date(this.formForFechaFirma.get('start')?.value).getFullYear()! : undefined;
      let startDateDay = this.formForFechaFirma.get('start')?.value ? new Date(this.formForFechaFirma.get('start')?.value).getDay()! : undefined;



      let endtDateMonth = this.formForFechaFirma.get('end')?.value ? new Date(this.formForFechaFirma.get('end')?.value).getMonth() + 1! : undefined;
      let endDateYear = this.formForFechaFirma.get('end')?.value ? new Date(this.formForFechaFirma.get('end')?.value).getFullYear()! : undefined;
      let endDateDay = this.formForFechaFirma.get('end')?.value ? new Date(this.formForFechaFirma.get('end')?.value).getDay()! : undefined;


      if (startDateMonth && startDateYear && endtDateMonth && endDateYear && startDateDay && endDateDay) {
        let startMonth = startDateMonth;
        let formattedStartMonth = startMonth < 10 ? '0' + startMonth : startMonth;
        let startYear = startDateYear;
        let startDay = startDateDay;
        let formattedStartDay = startDay < 10 ? '0' + startDay : startDay;


        let endMonth = endtDateMonth
        let formattedEndMonth = endMonth < 10 ? '0' + endMonth : endMonth;
        let endYear = endDateYear;
        let endDay = endDateDay;
        let formattedEndDay = endDay < 10 ? '0' + endDay : endDay;


        let yearAndMonthStart = parseInt(+startYear + '' + formattedStartMonth + '' + formattedStartDay)
        let yerarAndMonthEnd = parseInt(+endYear + '' + formattedEndMonth + '' + formattedEndDay)
        if (sistemaArmonizado) {

          this.filterByYearAndCompany({
            startYear: yearAndMonthStart,
            endYear: yerarAndMonthEnd,
            dataEnterprise: sistemaArmonizado

          });
        }
      }
    });

  }




  //****************************** */
  public formForYears3!: FormGroup;
  private formForYears3Subscription!: Subscription
  private buildFormForYears3(): void {
    this.formForYears3 = this._fb.group({
      start: [''],
      end: [''],
    })
    this.formForYears3Subscription = this.formForYears3.valueChanges.subscribe((value) => {
      let startDate = value.start ? new Date(value.start).getFullYear() : null;
      let endDate = value.end ? new Date(value.end).getFullYear() : null;

      if (startDate && endDate) {
        this.filterByThreeLabels({
          startYear: startDate,
          endYear: endDate,
          filtroTwo: this.formForPaisDestino.get('PaisDestino')?.value,
          filtroThre: this.formForSubpartida.get('Subpartida')?.value,


        });
      }


    });
  }

  public formForPaisDestino!: FormGroup
  private formForPaisDestinoSubscription!: Subscription
  private buildFormForPaisDestino(): void {
    this.formForPaisDestino = this._fb.group({
      PaisDestino: ['']
    });

    // Suscripción para cambios en el control de compañía
    this.formForPaisDestinoSubscription = this.formForPaisDestino.valueChanges.subscribe((value) => {
      let PaisDestino = value.PaisDestino;

      if (PaisDestino) {
        let startDate = this.formForYears3.get('start')?.value ? new Date(this.formForYears3.get('start')?.value).getFullYear()! : undefined;
        let endDate = this.formForYears3.get('end')?.value ? new Date(this.formForYears3.get('end')?.value).getFullYear()! : undefined;

        this.filterByThreeLabels({
          startYear: startDate,
          endYear: endDate,
          filtroTwo: PaisDestino,
          filtroThre: this.formForSubpartida.get('Subpartida')?.value,



        });
      }
    });
  }
  public formForSubpartida!: FormGroup
  private formForSubpartidaSubscription!: Subscription
  private buildFormForSubpartida(): void {
    this.formForSubpartida = this._fb.group({
      Subpartida: ['']
    });

    // Suscripción para cambios en el control de compañía
    this.formForSubpartidaSubscription = this.formForSubpartida.valueChanges.subscribe((value) => {
      let Subpartida = value.Subpartida;

      if (Subpartida) {
        let startDate = this.formForYears3.get('start')?.value ? new Date(this.formForYears3.get('start')?.value).getFullYear()! : undefined;
        let endDate = this.formForYears3.get('end')?.value ? new Date(this.formForYears3.get('end')?.value).getFullYear()! : undefined;

        this.filterByThreeLabels({
          startYear: startDate,
          endYear: endDate,
          filtroTwo: this.formForPaisDestino.get('PaisDestino')?.value,
          filtroThre: Subpartida,



        });
      }
    });
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
          dataEnterprise: this.formForCompany.get('company')?.value

        });
      }


    });
  }

  public formForCompany!: FormGroup
  private formForCompanySubscription!: Subscription
  private buildFormForCompany(): void {
    this.formForCompany = this._fb.group({
      dataEnterprise: ['']
    });

    // Suscripción para cambios en el control de compañía
    this.formForCompanySubscription = this.formForCompany.valueChanges.subscribe((value) => {
      let dataEnterprise = value.dataEnterprise;

      if (dataEnterprise) {
        let startDate = this.formForYears.get('start')?.value ? new Date(this.formForYears.get('start')?.value).getFullYear()! : undefined;
        let endDate = this.formForYears.get('end')?.value ? new Date(this.formForYears.get('end')?.value).getFullYear()! : undefined;

        this.filterByYearAndCompany({
          startYear: startDate,
          endYear: endDate,
          dataEnterprise: dataEnterprise
        });
      }
    });
  }


  public formForYears2!: FormGroup
  private formForYearsSubscription2!: Subscription

  private buildFormForYears2(): void {
    this.formForYears2 = this._fb.group({
      start: [''],
      end: [''],
    })
    this.formForYearsSubscription2 = this.formForYears2.valueChanges.subscribe((value) => {
      let startDate = value.start ? new Date(value.start).getFullYear() : null;
      let endDate = value.end ? new Date(value.end).getFullYear() : null;

      if (startDate && endDate) {
        this.filterByfourLabels({
          startYear: startDate,
          endYear: endDate,
          dataGeiAll: this.formFordataGeiAll.get('dataGeiAll')?.value,
          dataNameClass: this.formFordataNameClass.get('dataNameClass')?.value,
          dataEnterprise: this.formFordataEnterprise.get('dataEnterprise')?.value
        });
      }


    });
  }


  public formFordataGeiAll!: FormGroup
  private formFordataGeiAllSubscription!: Subscription
  private buildFormdataGeiAll(): void {
    this.formFordataGeiAll = this._fb.group({
      dataGeiAll: ['']
    });

    this.formFordataGeiAllSubscription = this.formFordataGeiAll.valueChanges.subscribe((value) => {
      let dataGeiAll = value.dataGeiAll;

      if (dataGeiAll) {
        let startDate = this.formForYears2.get('start')?.value ? new Date(this.formForYears2.get('start')?.value).getFullYear()! : undefined;
        let endDate = this.formForYears2.get('end')?.value ? new Date(this.formForYears2.get('end')?.value).getFullYear()! : undefined;
        this.filterByfourLabels({
          startYear: startDate,
          endYear: endDate,
          dataGeiAll: dataGeiAll,
          dataNameClass: this.formFordataNameClass.get('dataNameClass')?.value,
          dataEnterprise: this.formFordataEnterprise.get('dataEnterprise')?.value


        })

      }
    })
  }

  public formFordataNameClass!: FormGroup
  private formFordataNameClasslSubscription!: Subscription
  private buildFormdataNameClass(): void {
    this.formFordataNameClass = this._fb.group({
      dataNameClass: ['']
    });

    this.formFordataNameClasslSubscription = this.formFordataNameClass.valueChanges.subscribe((value) => {

      let dataNameClass = value.dataNameClass;
      if (dataNameClass) {
        let startDate = this.formForYears2.get('start')?.value ? new Date(this.formForYears2.get('start')?.value).getFullYear()! : undefined;
        let endDate = this.formForYears2.get('end')?.value ? new Date(this.formForYears2.get('end')?.value).getFullYear()! : undefined;
        this.filterByfourLabels({
          startYear: startDate,
          endYear: endDate,
          dataGeiAll: this.formFordataGeiAll.get('dataGeiAll')?.value,
          dataNameClass: dataNameClass,
          dataEnterprise: this.formFordataEnterprise.get('dataEnterprise')?.value
        })

      }
    })
  }

  public formFordataEnterprise!: FormGroup
  private formFordataEnterpriseSubscription!: Subscription
  private buildFormdataEnterprise(): void {
    this.formFordataEnterprise = this._fb.group({
      dataEnterprise: ['']
    });

    this.formFordataEnterpriseSubscription = this.formFordataEnterprise.valueChanges.subscribe((value) => {

      let dataEnterprise = value.dataEnterprise;
      if (dataEnterprise) {
        let startDate = this.formForYears2.get('start')?.value ? new Date(this.formForYears2.get('start')?.value).getFullYear()! : undefined;
        let endDate = this.formForYears2.get('end')?.value ? new Date(this.formForYears2.get('end')?.value).getFullYear()! : undefined;
        this.filterByfourLabels({
          startYear: startDate,
          endYear: endDate,
          dataGeiAll: this.formFordataGeiAll.get('dataGeiAll')?.value,
          dataNameClass: this.formFordataNameClass.get('dataNameClass')?.value,
          dataEnterprise: value.dataEnterprise
        })

      }
    })
  }








  public get startYearForInput(): number {
    return this.years[0] || 0;
  }
  public get finishYearForInput(): number {
    return this.years[this.years.length - 1] || 0;
  }





  ngOnDestroy(): void {
    this.formForYearsSubscription.unsubscribe();
    this.formForCompanySubscription.unsubscribe();
    this.formForYearsSubscription2.unsubscribe();
    this.formFordataGeiAllSubscription.unsubscribe();
    this.formFordataNameClasslSubscription.unsubscribe();
    this.formFordataEnterpriseSubscription.unsubscribe();
    this.formForYears3Subscription.unsubscribe();
    this.formForPaisDestinoSubscription.unsubscribe();
    this.formForSubpartidaSubscription.unsubscribe();
    this.formForFechaFirmaSubscription.unsubscribe();
    this.formForSistemaArmonizadoSubscription.unsubscribe();

  }
  filtroThree: any;

  filtroFour: any;
  filtroFive: any;
  filtroSix: any;
  filtroSeven: any;
  filtroEight: any;
  filterByThreeLabels(filters: {
    startYear?: number,
    endYear?: number,
    filtroTwo?: string,
    filtroThre?: string,


  }) {
    if ((filters.startYear === 0 && filters.endYear === 0 && filters.filtroTwo === '' && filters.filtroThre === '')
      || (filters.startYear === null && filters.endYear === null && filters.filtroTwo === null && filters.filtroTwo === null) ||
      (filters.startYear === undefined && filters.endYear === undefined && filters.filtroTwo === undefined && filters.filtroTwo === undefined)) {
      this.tableBody = this.dataTableSeries;

    } else if (this.codes == '2.1.1' || this.codes == '2.1.2' || this.codes == '2.2.1' || this.codes == '2.2.2') {
      this.tableBody = this.dataTableSeries.filter((serie: any) => {
        return ((filters.startYear === undefined || filters.endYear === 0) ? true : serie[0].toString() >= filters.startYear) &&
          ((filters.endYear === undefined || filters.endYear === 0) ? true : serie[0].toString() <= filters.endYear) &&
          ((filters.filtroTwo === undefined || filters.filtroTwo === '') ? true : serie[1].toString() === filters.filtroTwo) &&
          ((filters.filtroThre === undefined || filters.filtroThre === '') ? true : serie[2].toString() === filters.filtroThre)

      });

    } else if (this.codes == '4.7') {
      this.tableBody = this.dataTableSeries.filter((serie: any) => {
        return ((filters.startYear === undefined || filters.endYear === 0) ? true : serie[0].toString() >= filters.startYear) &&
          ((filters.endYear === undefined || filters.endYear === 0) ? true : serie[0].toString() <= filters.endYear) &&
          ((filters.filtroTwo === undefined || filters.filtroTwo === '') ? true : serie[1].toString() === filters.filtroTwo) &&
          ((filters.filtroThre === undefined || filters.filtroThre === '') ? true : serie[5].toString() === filters.filtroThre)
      });
    } else if (this.codes == '2.12') {
      this.tableBody = this.dataTableSeries.filter((serie: any) => {
        return ((filters.startYear === undefined || filters.endYear === 0) ? true : serie[0].toString() >= filters.startYear) &&
          ((filters.endYear === undefined || filters.endYear === 0) ? true : serie[0].toString() <= filters.endYear) &&
          ((filters.filtroTwo === undefined || filters.filtroTwo === '') ? true : serie[2].toString() === filters.filtroTwo) &&
          ((filters.filtroThre === undefined || filters.filtroThre === '') ? true : serie[4].toString() === filters.filtroThre)
      });
    }
  }
  filterByfourLabels(filters: {
    startYear?: number,
    endYear?: number,
    dataGeiAll?: string,
    dataNameClass?: string,
    dataEnterprise?: string

  }) {
    if ((filters.startYear === 0 && filters.endYear === 0 && filters.dataGeiAll === '' && filters.dataNameClass === '' && filters.dataEnterprise === '')
      || (filters.dataGeiAll === null && filters.dataNameClass === null && this.dataEnterprise === null && filters.startYear === null && filters.endYear === null) ||
      (filters.startYear === undefined && filters.endYear === undefined && filters.dataGeiAll === undefined && filters.dataNameClass === undefined && filters.dataEnterprise === undefined)) {
      this.tableBody = this.dataTableSeries;

    } else {
      this.tableBody = this.dataTableSeries.filter((serie: any) => {
        return ((filters.startYear === undefined || filters.startYear === 0) ? true : serie[0] >= filters.startYear) &&
          ((filters.endYear === undefined || filters.endYear === 0) ? true : serie[0] <= filters.endYear) &&
          ((filters.dataGeiAll === undefined || filters.dataGeiAll === '') ? true : serie[8].toString() === filters.dataGeiAll) &&
          ((filters.dataNameClass === undefined || filters.dataNameClass === '') ? true : serie[7].toString() === filters.dataNameClass) &&
          ((filters.dataEnterprise === undefined || filters.dataEnterprise === '') ? true : serie[1].toString() === filters.dataEnterprise)
          ;
      });

    }
  }
  filterByEightLabels(filtroOne: any, filtroTwo: any, filtroThree: any, filtroFour: any, filtroFive: any
    , filtroSix: any, filtroSeven: any, filtroEight: any) {
    if ((filtroOne === '' && filtroTwo === '' && filtroThree === '' && filtroFour === '' && filtroFive === ''
      && filtroSix === '' && filtroSeven === '' && filtroEight === '')
      || (filtroOne === null && filtroTwo === null && filtroThree === null && filtroFour === null &&
        filtroFive === null && filtroSix === null && filtroSeven === null && filtroEight === null) ||
      (filtroOne === undefined && filtroTwo === undefined && filtroThree === undefined && filtroFour === undefined &&
        filtroFive === undefined && filtroSix === undefined && filtroSeven === undefined && filtroEight === undefined)) {
      this.tableBody = this.dataTableSeries;

    } else {
      this.tableBody = this.dataTableSeries.filter((serie: any) => {
        return ((filtroOne === undefined || filtroOne === '') ? true : serie[0].toString() === filtroOne) &&
          ((filtroTwo === undefined || filtroTwo === '') ? true : serie[1].toString() === filtroTwo) &&
          ((filtroThree === undefined || filtroThree === '') ? true : serie[2].toString() === filtroThree) &&
          ((filtroFour === undefined || filtroFour === '') ? true : serie[4].toString() === filtroFour) &&
          ((filtroFive === undefined || filtroFive === '') ? true : serie[6].toString() === filtroFive) &&
          ((filtroSix === undefined || filtroSix === '') ? true : serie[7].toString() === filtroSix) &&
          ((filtroSeven === undefined || filtroSeven === '') ? true : serie[8].toString() === filtroSeven) &&
          ((filtroEight === undefined || filtroEight === '') ? true : serie[9].toString() === filtroEight);
      });
    }
  }

  pageSize = 12;
  desde: number = 0;
  hasta: number = 12;
  cambiarPagina(e: PageEvent) {
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }


}
