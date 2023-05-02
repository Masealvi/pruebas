import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IndicadorChildToParentService } from '../../national/services/graficas/indicador-child-to-parent.service';
import { ActivatedRoute } from '@angular/router';
import { Utilidades } from 'src/app/utils/utilidades';

@Component({
  selector: 'app-tab-main-m',
  templateUrl: './tab-main-m.component.html',
  styleUrls: ['./tab-main-m.component.css']
})
export class TabMainMComponent implements OnInit {

  onChangeIndicadorSubML: Subscription;
  private urlBaseSummary: string = '/indicador-multilateral/';
  private urlBasePositioning: string = '/indicador-multilateral/posicionamiento/';
  private urlBaseComparative: string = '/indicador-multilateral/comparativo/';
  private urlBaseComparisonByMeasures: string = '/indicador-multilateral/comparacion-medidas/';
  private urlBaseWorldComparison: string = '/indicador-multilateral/comparativa-mundial/';
  private urlBasePatents: string = '/indicador-multilateral/patentes/';
  private urlBaseMarineTransport: string = '/indicador-multilateral/transporte-maritimo/';
  private urlBaseRailways: string = '/indicador-multilateral/ferrocarriles/';
  private urlBaseAirTransport: string = '/indicador-multilateral/transporte-aereo/';
  codes: any;
  summary: string = "";
  positioning: string = "";
  comparative: string = "";
  comparisonByMeasures: string = "";
  worldComparison: string = "";
  patents: string = "";
  marineTransport: string = "";
  railways: string = "";
  airTransport: string = "";
  loadingMain: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private childToParentService: IndicadorChildToParentService,
  ) {
    this.onChangeIndicadorSubML = this.childToParentService.onChangeIndicador$.subscribe($event => {
      this.getRouterParam();
    });
  }

  ngOnInit(): void {
    let _cod: number = this.getCodeFromURL();
    if (_cod < 1 || _cod > 3) {
      Utilidades.getMensajeModal('Código ingresado no es válido', 'info');
    } else {
      this.loadingMain = false;
      this.codes = _cod;
      this.getRouterParam();
    }
  }

  private getCodeFromURL(): number {
    let _cod: number = 0;
    if (this.route.children.length > 0) {
      let _val: string = this.route.children[0].snapshot.paramMap.get('codigo')?.toString() ?? "";
      if (!isNaN(Number(_val))) {
        _cod = Number(_val);
      }
    }
    return _cod;
  }

  getRouterParam() {
    let _cod: number = this.getCodeFromURL();
    if (_cod != null) {
      this.codes = _cod;
      this.summary = this.urlBaseSummary + _cod;
      this.positioning = this.urlBasePositioning + _cod;
      this.comparative = this.urlBaseComparative + _cod;
      this.comparisonByMeasures = this.urlBaseComparisonByMeasures + _cod;
      this.worldComparison = this.urlBaseWorldComparison + _cod;
      this.patents = this.urlBasePatents + _cod;
      this.marineTransport = this.urlBaseMarineTransport + _cod;
      this.railways = this.urlBaseRailways + _cod;
      this.airTransport = this.urlBaseAirTransport + _cod;
    }
  }

  ngOnDestroy(): void {
    if (this.onChangeIndicadorSubML) {
      this.onChangeIndicadorSubML.unsubscribe();
    }
  }

}