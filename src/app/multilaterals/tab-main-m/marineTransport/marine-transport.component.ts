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
  selector: 'app-marine-transport',
  templateUrl: './marine-transport.component.html',
  styleUrls: ['./marine-transport.component.css']
})
export class MarineTransportComponent implements OnInit {
  formGraficarMarine?: FormGroup;
  alertMessageMarine: boolean = true;
  inactiveButtonMarine: boolean = true;
  loadingMarine: boolean = true;
  paisesMarine = new FormControl();
  aniosMarine = new FormControl();

  yearsMarine: any;
  countriesMarine: any;

  private dataMarine: any;
  private medida: any[] = [];
  medidaFiltrado: any[] = [];

  lineChartMarine: Chart = new Chart();
  barChartMarine: Chart = new Chart();
  tableHtmlMarine: any;

  codesMarine: any;
  nameGraphicMarine?: string;

  constructor(
    private indicadorMultilateralService: IndicadorMultilateralService,
    private route: ActivatedRoute,
    private sendCodeService: SendCodeService,
    private fb: FormBuilder
  ) {
    this.crarFormularioMarine();
  }

  ngOnInit(): void {
    this.codesMarine = this.route.snapshot.paramMap.get('codigo');
    localStorage.setItem(KEY_PARAM_ML, JSON.stringify({ graphic: this.codesMarine }));
    this.sendCodeService.onChangeIndicador$.next(this.codesMarine);
    this.getIndicatorMultilateralMarine(this.codesMarine);
  }

  private crarFormularioMarine(): void {
    this.formGraficarMarine = this.fb.group({
      cboMedida: [],
    });
  }

  private getIndicatorMultilateralMarine(code: string) {
    this.indicadorMultilateralService.getIndicatorMultilateralByCode(code).subscribe(
      (response) => {
        this.dataMarine = response.data[2];
        this.yearsMarine = Utilidades.getYears(this.dataMarine.series, 0)
        this.countriesMarine = Utilidades.getCountries(this.dataMarine.series, 1);
        this.countriesMarine.unshift(ITEM_TODOS);
        this.medida = this.dataMarine.dimensiones; // Originales
        this.getMedidaFiltradoMarine();
        this.loadingMarine = this.dataMarine !== null ? false : true;
      }
    );

  }

  private getMedidaFiltradoMarine(): void {
    let _newDimensiones: any[] = this.medida;
    this.medidaFiltrado = _newDimensiones.map(e => e).slice(3);
    if (this.medidaFiltrado != null && this.medidaFiltrado.length > 0) {
      this.formGraficarMarine?.get("cboMedida")?.setValue(this.medidaFiltrado[0]);
    }
  }

  //#CHIPS
  selectableMarine = true;
  removableMarine = true;
  selectToChipsMarine: any[] = [];

  removeChipMarine(seleccionado: any) {
    Utilidades.removeChip(this.selectToChipsMarine, seleccionado, this.paisesMarine, this.aniosMarine);
    this.inactiveButtonMarine = !(this.selectToChipsMarine.some(e => e.tipo === 'A') && this.selectToChipsMarine.some(e => e.tipo === 'P'));
    if (!this.inactiveButtonMarine) {
      this.graficarMarine();
    } else {
      this.alertMessageMarine = true;
    }
  }
  //END CHIPS

  getFiltrosAplicadosMarine(code: any, value: any, strTipo: string) {
    if (code == ITEM_TODOS.code) { // ALL
      let _index = this.paisesMarine.value.findIndex((e: any) => e === ITEM_TODOS.name);
      // retirar paises de select
      this.paisesMarine.value.length = 0;
      // retirar los paises de chips
      this.selectToChipsMarine = this.selectToChipsMarine.filter(e => e.tipo !== strTipo);
      // Seleccionado
      if (_index > -1) {
        this.countriesMarine.forEach((e: any) => {
          this.paisesMarine.value.push(e.name)
          this.selectToChipsMarine.push({ code: e.code, valor: e.name, tipo: strTipo });
        });
      }
      this.paisesMarine.patchValue(this.paisesMarine.value); // check | uncheck

      if (this.paisesMarine.value.length > 0) {
        // retirar el pais ALL
        _index = this.paisesMarine.value.findIndex((e: any) => e === ITEM_TODOS.name);
        this.paisesMarine.value.splice(_index, 1);
        // retirar de chips
        _index = this.selectToChipsMarine.findIndex((e: any) => e.valor === ITEM_TODOS.name);
        this.selectToChipsMarine.splice(_index, 1);
      }
    } else {
      let resultado = this.selectToChipsMarine.find(e => e.code === code) ?? null;
      if (resultado == null) {
        this.selectToChipsMarine.push({ code: code, valor: value, tipo: strTipo });
      } else {
        this.selectToChipsMarine = this.selectToChipsMarine.filter(e => e.code !== code);
      }
    }
    this.inactiveButtonMarine = !(this.selectToChipsMarine.some(e => e.tipo === 'A') && this.selectToChipsMarine.some(e => e.tipo === 'P'));
    if (!this.inactiveButtonMarine) {
      this.graficarMarine();
    }
  }

  getDataLeaked(data: any[]) {
    let arrayFiltradoMarine: any[] = [];
    let newFiltradoMarine: any[] = [];
    let arrayPaisMarine: any[] = [];
    let arrayAnioMarine: any[] = [];
    let posMedidaMarine: number = 0;
    let aDataMarine: any[] = [];
    let serieMarine = this.dataMarine.series;

    for (let index = 0; index < data.length; index++) {
      if (data[index].tipo === 'P') {
        arrayPaisMarine.push(data[index].code);
      }
      if (data[index].tipo === 'A') {
        arrayAnioMarine.push(data[index].code);
      }
      if (data[index].tipo === 'G') {
        posMedidaMarine = parseFloat(data[index].code);
      }
    }

    arrayPaisMarine.forEach((e) => {
      serieMarine.filter((s: any) => {
        if (s[2] == e) {
          aDataMarine.push(s);
        }
      });
    });

    arrayAnioMarine.forEach((e) => {
      aDataMarine.forEach((s) => {
        if (s[0] == e) {
          arrayFiltradoMarine.push(s);
          newFiltradoMarine.push(s.slice(0, 3));
        }
      });
    });

    for (let index = 0; index < arrayFiltradoMarine.length; index++) {
      let valor: number;
      valor = parseFloat(arrayFiltradoMarine[index].slice(posMedidaMarine, posMedidaMarine + 1));
      newFiltradoMarine[index].push(valor);

    }
    return newFiltradoMarine;
  }

  //botón graficar
  graficarMarine(): void {
    this.alertMessageMarine = false;
    let itemSearch = this.formGraficarMarine?.get("cboMedida")?.value;
    let posMedida = this.medida.findIndex((e: any) => e === itemSearch);
    this.nameGraphicMarine = itemSearch;

    if (posMedida == -1) {
      // no selecciono medida | medida seleccionada no existe...
      return;
    }

    // process.
    let aFiltro = [...this.selectToChipsMarine];
    aFiltro.unshift(ITEM_PERU);
    aFiltro.push({ code: posMedida, valor: posMedida, tipo: "G" });
    let dataOrdenadaChartMarine = Utilidades.orderArray(this.getDataLeaked(aFiltro), 0);
    //grafica de barra
    this.barChartMarine = Graficas.generateBarChart(dataOrdenadaChartMarine);
    //grafica de linea
    this.lineChartMarine = Graficas.generateLineChart(dataOrdenadaChartMarine, false);
    //grafica table
    this.tableHtmlMarine = Graficas.generateTable3(dataOrdenadaChartMarine);
  }

  changeSelectorMarine() {
    this.inactiveButtonMarine = !(this.selectToChipsMarine.some(e => e.tipo === 'A') && this.selectToChipsMarine.some(e => e.tipo === 'P'));
    if (!this.inactiveButtonMarine) {
      this.graficarMarine();
    }
  }
}
