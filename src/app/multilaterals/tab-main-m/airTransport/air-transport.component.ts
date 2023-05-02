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
  selector: 'app-air-transport',
  templateUrl: './air-transport.component.html',
  styleUrls: ['./air-transport.component.css']
})
export class AirTransportComponent implements OnInit {
  formGraficarAir?: FormGroup;
  alertMessageAir: boolean = true;
  inactiveButtonAir: boolean = true;
  loadingAir: boolean = true;
  paisesAir = new FormControl();
  aniosAir = new FormControl();

  yearsAir: any;
  countriesAir: any;

  private dataAir: any;
  private medida: any[] = [];
  medidaFiltrado: any[] = [];

  lineChartAir: Chart = new Chart();
  barChartAir: Chart = new Chart();
  tableHtmlAir: any;

  codesAir: any;
  nameGraphicAir?: string;

  constructor(
    private indicadorMultilateralService: IndicadorMultilateralService,
    private route: ActivatedRoute,
    private sendCodeService: SendCodeService,
    private fb: FormBuilder
  ) {
    this.crarFormularioAir();
  }

  ngOnInit(): void {
    this.codesAir = this.route.snapshot.paramMap.get('codigo');
    localStorage.setItem(KEY_PARAM_ML, JSON.stringify({ graphic: this.codesAir }));
    this.sendCodeService.onChangeIndicador$.next(this.codesAir);
    this.getIndicatorMultilateralAir(this.codesAir);
  }

  private crarFormularioAir(): void {
    this.formGraficarAir = this.fb.group({
      cboMedida: [],
    });
  }

  private getIndicatorMultilateralAir(code: string) {
    this.indicadorMultilateralService.getIndicatorMultilateralByCode(code).subscribe(
      (response) => {
        this.dataAir = response.data[4];
        this.yearsAir = Utilidades.getYears(this.dataAir.series, 0)
        this.countriesAir = Utilidades.getCountries(this.dataAir.series, 1);
        this.countriesAir.unshift(ITEM_TODOS);
        this.medida = this.dataAir.dimensiones; // Originales
        this.getMedidaFiltradoAir();
        this.loadingAir = this.dataAir !== null ? false : true;
      }
    );

  }

  private getMedidaFiltradoAir(): void {
    let _newDimensiones: any[] = this.medida;
    this.medidaFiltrado = _newDimensiones.map(e => e).slice(3);
    if (this.medidaFiltrado != null && this.medidaFiltrado.length > 0) {
      this.formGraficarAir?.get("cboMedida")?.setValue(this.medidaFiltrado[0]);
    }
  }

  //#CHIPS
  selectableAir = true;
  removableAir = true;
  selectToChipsAir: any[] = [];

  removeChip(seleccionado: any) {
    Utilidades.removeChip(this.selectToChipsAir, seleccionado, this.paisesAir, this.aniosAir);
    this.inactiveButtonAir = !(this.selectToChipsAir.some(e => e.tipo === 'A') && this.selectToChipsAir.some(e => e.tipo === 'P'));
    if (!this.inactiveButtonAir) {
      this.graficarAir();
    } else {
      this.alertMessageAir = true;
    }
  }
  //END CHIPS

  getFiltrosAplicadosAir(code: any, value: any, strTipo: string) {
    if (code == ITEM_TODOS.code) { // ALL
      let _index = this.paisesAir.value.findIndex((e: any) => e === ITEM_TODOS.name);
      // retirar paises de select
      this.paisesAir.value.length = 0;
      // retirar los paises de chips
      this.selectToChipsAir = this.selectToChipsAir.filter(e => e.tipo !== strTipo);
      // Seleccionado
      if (_index > -1) {
        this.countriesAir.forEach((e: any) => {
          this.paisesAir.value.push(e.name)
          this.selectToChipsAir.push({ code: e.code, valor: e.name, tipo: strTipo });
        });
      }
      this.paisesAir.patchValue(this.paisesAir.value); // check | uncheck

      if (this.paisesAir.value.length > 0) {
        // retirar el pais ALL
        _index = this.paisesAir.value.findIndex((e: any) => e === ITEM_TODOS.name);
        this.paisesAir.value.splice(_index, 1);
        // retirar de chips
        _index = this.selectToChipsAir.findIndex((e: any) => e.valor === ITEM_TODOS.name);
        this.selectToChipsAir.splice(_index, 1);
      }
    } else {
      let resultado = this.selectToChipsAir.find(e => e.code === code) ?? null;
      if (resultado == null) {
        this.selectToChipsAir.push({ code: code, valor: value, tipo: strTipo });
      } else {
        this.selectToChipsAir = this.selectToChipsAir.filter(e => e.code !== code);
      }
    }
    this.inactiveButtonAir = !(this.selectToChipsAir.some(e => e.tipo === 'A') && this.selectToChipsAir.some(e => e.tipo === 'P'));
    if (!this.inactiveButtonAir) {
      this.graficarAir();
    }
  }

  getDataLeaked(data: any[]) {
    let arrayFiltradoAir: any[] = [];
    let newFiltradoAir: any[] = [];
    let arrayPaisAir: any[] = [];
    let arrayAnioAir: any[] = [];
    let posMedidaAir: number = 0;
    let aDataAir: any[] = [];
    let serieAir = this.dataAir.series;

    for (let index = 0; index < data.length; index++) {
      if (data[index].tipo === 'P') {
        arrayPaisAir.push(data[index].code);
      }
      if (data[index].tipo === 'A') {
        arrayAnioAir.push(data[index].code);
      }
      if (data[index].tipo === 'G') {
        posMedidaAir = parseFloat(data[index].code);
      }
    }

    arrayPaisAir.forEach((e) => {
      serieAir.filter((s: any) => {
        if (s[2] == e) {
          aDataAir.push(s);
        }
      });
    });

    arrayAnioAir.forEach((e) => {
      aDataAir.forEach((s) => {
        if (s[0] == e) {
          arrayFiltradoAir.push(s);
          newFiltradoAir.push(s.slice(0, 3));
        }
      });
    });

    for (let index = 0; index < arrayFiltradoAir.length; index++) {
      let valor: number;
      valor = parseFloat(arrayFiltradoAir[index].slice(posMedidaAir, posMedidaAir + 1));
      newFiltradoAir[index].push(valor);
    }
    return newFiltradoAir;
  }

  //botón graficar
  graficarAir(): void {
    let itemSearch = this.formGraficarAir?.get("cboMedida")?.value;
    let posMedida = this.medida.findIndex((e: any) => e === itemSearch);
    this.nameGraphicAir = itemSearch;
    this.alertMessageAir = false;

    if (posMedida == -1) {
      // no selecciono medida | medida seleccionada no existe...
      return;
    }

    // process.
    let aFiltro = [...this.selectToChipsAir];
    aFiltro.unshift(ITEM_PERU);
    aFiltro.push({ code: posMedida, valor: posMedida, tipo: "G" });
    let dataOrdenadaChartAir = Utilidades.orderArray(this.getDataLeaked(aFiltro), 0);
    //grafica de barra
    this.barChartAir = Graficas.generateBarChart(dataOrdenadaChartAir);
    //grafica de linea
    this.lineChartAir = Graficas.generateLineChart(dataOrdenadaChartAir, false);
    //grafica table
    this.tableHtmlAir = Graficas.generateTable3(dataOrdenadaChartAir);
  }

  changeSelectorAir() {
    this.inactiveButtonAir = !(this.selectToChipsAir.some(e => e.tipo === 'A') && this.selectToChipsAir.some(e => e.tipo === 'P'));
    if (!this.inactiveButtonAir) {
      this.graficarAir();
    }
  }
}
