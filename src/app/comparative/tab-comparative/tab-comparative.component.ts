import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import Swal from 'sweetalert2';
import { ComparativeService } from './services/comparative.service';
import { PageEvent, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
@Component({
  selector: 'app-tab-comparative',
  templateUrl: './tab-comparative.component.html',
  styleUrls: ['./tab-comparative.component.css'],
})
export class TabComparativeComponent implements OnInit {
  totalItems?: number;
  itemsPorPagina?: number;
  paginasTotales?: number;
  selectmoneda: string = '2';

  sentidadTipoId: any = '';
  tipoServicioId: any = '';
  tipoComercioId: any = '';
  tipoCargaId: any = '';
  tipoViaProcedId: any = '';
  tipoEnvioId: any = '';
  tipoVehiculoId: any = '';
  termPortAeropId: any = '';
  opeTipOpeCircunscripcionId: any = '';
  lineaNavieraId: any = '';
  modTranspId: any = '';
  modoTransporteId: any = '';
  monedaId: any = '';
  categoriaId: any = '';
  origenPaisId: any = '';
  destinoPaisId: any = '';
  origenZonaId: any = '';
  destinoZonaId: any = '';
  puertoOrigenId: any = '';
  puertoDestinoId: any = '';
  denominacionServicio: any = '';
  ciudadOrigen: any = '';

  listarRegiones: any;
  public selectedNombreOperador: any = { id: 0, nombre: ' ' };
  public operator: any[] = [];
  public tipoComercio: any[] = [];
  public tipoServicio: any[] = [];
  public terminalPortuario: any[] = [];
  public circunscripcion_aduanera: any[] = [];
  public tipoCarga: any[] = [];
  public tipoViaProcedencia: any[] = [];
  public modalidadTransporte: any[] = [];
  public paises: any[] = [];
  public puertos: any[] = [];
  public zonas: any[] = [];
  public lineasNavieras: any[] = [];
  public docsTransporte: any[] = [];
  public categoria: any[] = [];
  public moneda: any[] = [];
  public adminConce: any[] = [];

  public labels: any[] = [];
  categoriaSeleccionada = false;
  removable = true;
  selectable = true;
  selectToChips: any[] = [];
  datosSelect: any[] = [];
  misDatosSelect: Record<string, any> = {
    entidadTipoId: null,
    tipoServicioId: null,
    tipoComercioId: null,
    tipoCargaId: null,
    tipoViaProcedId: null,
    tipoEnvioId: null,
    tipoVehiculoId: null,
    termPortAeropId: null,
    opeTipOpeCircunscripcionId: null,
    lineaNavieraId: null,
    modTranspId: null,
    modoTransporteId: null,
    monedaId: null,
    categoriaId: null,
    origenPaisId: null,
    destinoPaisId: null,
    origenZonaId: null,
    destinoZonaId: null,
    puertoOrigenId: null,
    puertoDestinoId: null,
    denominacionServicio: null,
    ciudadOrigen: null,
  };

  labelsSelect: Record<string, any> = {
    entidadTipoId: 'Empresas',
    tipoServicioId: 'Tipo servicio',
    tipoComercioId: 'Tipo Comercio',
    tipoCargaId: 'Tipo de Carga',
    tipoViaProcedId: 'Tipo de Vía de procedencia',
    tipoEnvioId: 'Tipo envio',
    tipoVehiculoId: 'Tipo vehiculo',
    termPortAeropId: "Terminal Portuario'",
    opeTipOpeCircunscripcionId: 'Aduanas',
    lineaNavieraId: 'Linea Naviera',
    modTranspId: '1er Medio de Transporte',
    modoTransporteId: 'Modalidad de transporte',
    monedaId: 'Moneda',
    categoriaId: 'Categoria',
    origenPaisId: 'País de Origen',
    destinoPaisId: 'País de Destino',
    origenZonaId: 'Zona origen',
    destinoZonaId: 'Por Zona Destino',
    puertoOrigenId: 'Puerto Origen',
    puertoDestinoId: 'Puerto Destino',
    denominacionServicio: 'Denominacion servicio',
    ciudadOrigen: 'Regiones',
  };

  mostrarAviso = true;
  enableMoneda = false;
  categoriaCom = new FormControl();

  pageSize = 8;
  desde: number = 0;
  hasta: number = 8;
  constructor(
    private comparativeService: ComparativeService,
    private paginatorIntl: MatPaginatorIntl,
    private elementRef: ElementRef
  ) {
    paginatorIntl.itemsPerPageLabel = 'Servicios por página:';
    paginatorIntl.nextPageLabel = 'Siguiente';
    paginatorIntl.previousPageLabel = 'Anterior';
    paginatorIntl.firstPageLabel = 'Primera página';
    paginatorIntl.lastPageLabel = 'Última página';
  }

  ngOnInit(): void {
    this.selectedValue = 'Z-a';
    this.comparativeService.getAllTipoOperador().subscribe((response) => {
      this.operator = response;
    });
    this.comparativeService
      .getAllTipoComercio()
      .subscribe((responseTipoComercio) => {
        this.tipoComercio = responseTipoComercio;
      });

    this.comparativeService
      .getAllTipoServicio()
      .subscribe((responseTipoServicio) => {
        this.tipoServicio = responseTipoServicio;
      });
    this.comparativeService
      .getAllTerminalPortuario()
      .subscribe((responseTerminalPortuario) => {
        this.terminalPortuario = responseTerminalPortuario;
      });

    this.comparativeService
      .getAllCircunscripcionAduanera()
      .subscribe((responseCircunscripcionAduanera) => {
        this.circunscripcion_aduanera = responseCircunscripcionAduanera;
      });
    this.comparativeService.getAllTipoCarga().subscribe((responseTipoCarga) => {
      this.tipoCarga = responseTipoCarga;
    });

    this.comparativeService
      .getAllTipoViaProcedencia()
      .subscribe((responseTipoViaProcedencia) => {
        this.tipoViaProcedencia = responseTipoViaProcedencia;
      });
    this.comparativeService
      .getAllModalidadTransporte()
      .subscribe((responseModalidadTransporte) => {
        this.modalidadTransporte = responseModalidadTransporte;
      });
    this.comparativeService.getAllPaises().subscribe((responsePaises) => {
      this.paises = responsePaises;
    });
    this.comparativeService.getAllPuertos().subscribe((responsePuertos) => {
      this.puertos = responsePuertos;
    });
    this.comparativeService.getAllZonas().subscribe((responseZonas) => {
      this.zonas = responseZonas;
    });
    this.comparativeService.getAllLineaNaviera().subscribe((responseLineas) => {
      this.lineasNavieras = responseLineas;
    });
    this.comparativeService
      .getAllDocTransporte()
      .subscribe((responseDocTransporte) => {
        this.docsTransporte = responseDocTransporte;
      });
    this.comparativeService.getAllCategoria().subscribe((responseCategoria) => {
      this.categoria = responseCategoria;
    });
    this.comparativeService.getAllMoneda().subscribe((responseMoneda) => {
      this.moneda = responseMoneda;
      this.dolarSoles = this.moneda.filter(
        (item) => item.nombre === 'SOLES' || item.nombre === 'DÓLARES'
      );
      console.log(this.dolarSoles);
    });
  }
  dolarSoles: any[] = [];
  private getOperator(data: any[]) {
    var arrayOperator: any = [];

    for (let i = 0; i < data.length; i++) {
      this.setUniqueOperator(arrayOperator, data[i].operador);
    }
    return arrayOperator;
  }

  limpiarSelect(id: string) {
    switch (id) {
      case 'entidadTipoId':
        this.sentidadTipoId = '';

        break;
      case 'tipoServicioId':
        this.tipoServicioId = '';

        break;
      case 'tipoComercioId':
        this.tipoComercioId = '';

        break;
      case 'tipoCargaId':
        this.tipoCargaId = '';

        break;
      case 'tipoViaProcedId':
        this.tipoViaProcedId = '';

        break;
      case 'tipoEnvioId':
        this.tipoEnvioId = '';

        break;
      case 'tipoVehiculoId':
        this.tipoVehiculoId = '';

        break;
      case 'termPortAeropId':
        this.termPortAeropId = '';

        break;
      case 'opeTipOpeCircunscripcionId':
        this.opeTipOpeCircunscripcionId = '';

        break;
      case 'lineaNavieraId':
        this.lineaNavieraId = '';

        break;
      case 'modTranspId':
        this.modTranspId = '';

        break;
      case 'modoTransporteId':
        this.modoTransporteId = '';

        break;
      case 'monedaId':
        this.monedaId = '';

        break;
      case 'categoriaId':
        this.categoriaId = '';

        break;
      case 'origenPaisId':
        this.origenPaisId = '';

        break;
      case 'destinoPaisId':
        this.destinoPaisId = '';

        break;
      case 'origenZonaId':
        this.origenZonaId = '';

        break;
      case 'destinoZonaId':
        this.destinoZonaId = '';

        break;
      case 'puertoOrigenId':
        this.puertoOrigenId = '';

        break;
      case 'puertoDestinoId':
        this.puertoDestinoId = '';

        break;
      case 'denominacionServicio':
        this.denominacionServicio = '';

        break;
      case 'ciudadOrigen':
        this.ciudadOrigen = '';

        break;
    }
  }

  public setUniqueOperator(arrayData: any[], operator: any) {
    let exist: boolean = false;
    arrayData.forEach((op) => {
      if (op.id == operator.id) {
        exist = true;
      }
    });
    if (!exist) {
      arrayData.push(operator);
    }
  }

  removeChip(seleccionado: any): void {
    let index = this.selectToChips.indexOf(seleccionado);

    console.log('11111', index);
    if (index >= 0) {
      console.log('123');
      this.selectToChips.splice(index, 1);
      this.contadorSelectChips--;

      this.limpiarSelect(seleccionado.tipo);
    }
    if (this.selectToChips.length == 0) {
      this.buscar();
    }
  }

  contadorSelectChips: number = 0;

  @ViewChild('tabla') tabla?: ElementRef;

  imprimir() {
    let contenido =
      '<h2>' +
      this.getRazonSocial +
      '</h2><table><thead><tr><th>Servicio</th><th>Descripción</th><th>Moneda</th><th>Precio</th></tr></thead><tbody>';

    for (let i = 0; i < this.serviciosEmpresa.length; i++) {
      contenido +=
        '<tr><td>' +
        this.serviciosEmpresa[i].denominacionServicio +
        '</td><td>' +
        this.serviciosEmpresa[i].descripcion +
        '</td><td>' +
        this.serviciosEmpresa[i].moneda +
        '</td><td>' +
        this.serviciosEmpresa[i].precio +
        '</td></tr>';
    }
    contenido += '</tbody></table>';
    let estilo =
      '<style>table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid black; padding: 5px; } th:nth-child(3), td:nth-child(3) { width: 100px; } th:nth-child(4), td:nth-child(4) { width: 80px; }</style>';

    let ventana = window.open('', '', 'height=500,width=800');
    ventana?.document.write('<html><head>');
    ventana?.document.write(estilo);
    ventana?.document.write('</head><body>');
    ventana?.document.write(contenido);
    ventana?.document.write('</body></html>');
    ventana?.document.close();
    ventana?.focus();
    ventana?.print();
    ventana?.close();
  }

  getFiltrosAplicados(code: any, value: any, filterKey: string) {
    let resultado =
      this.selectToChips.find(
        (selectToChips) => selectToChips.tipo == filterKey
      ) ?? null;
    console.log(resultado);
    if (resultado == null) {
      this.selectToChips.push({ code: code, valor: value, tipo: filterKey });
      console.log(this.selectToChips);
    } else {
      this.selectToChips = this.selectToChips.filter((e) => e.valor !== value);
    }

    this.contadorSelectChips = this.selectToChips.length;
  }
  ordenarData: any[] = [];
  selectedItem: any = null;
  buscar() {
    this.mostrarAviso = false;
    this.adminConce = [];
    if (this.selectToChips != null && this.selectToChips != undefined) {
      this.comparativeService
        .getFiltroTipoComparative(this.selectToChips)
        .subscribe((response) => {
          this.adminConce = this.getOperator(response.detalles);

          this.ordenarData = this.adminConce.sort((a, b) =>
            a.razonSocial.localeCompare(b.razonSocial)
          );

          console.log(this.ordenarData);
          this.contadorEmpresa = this.adminConce.length;
          console.log(this.adminConce);
          console.log(this.ordenarData);
          if (this.adminConce.length == 0) {
            this.getMensajeModal('No hay información para mostrar', 'info');
          }
        });
    }
  }

  selectedValue: any;
  ordenamiento(selectValue: any) {
    this.selectToChips = [];
    this.contadorSelectChips = 0;
    this.comparativeService
      .getFiltroTipoComparative(this.selectToChips)
      .subscribe((response) => {
        this.adminConce = this.getOperator(response.detalles);
        if (selectValue === 'A-z') {
          this.ordenarData = this.adminConce.sort((a, b) =>
            a.razonSocial.localeCompare(b.razonSocial)
          );
        } else if (selectValue === 'Z-a') {
          this.ordenarData = this.adminConce.sort((a, b) =>
            b.razonSocial.localeCompare(a.razonSocial)
          );
        }
      });
  }

  serviciosEmpresa: any[] = [];
  getRazonSocial: any;
  contadorServicios: number = 0;
  arraySumaMoneda: any[] = [];
  verEmpresa(idEmpresa: any, razonSocial: any) {
    this.contadorServicios = 0;

    const monedaId = this.selectToChips[1]?.code;
    var arrayRespuesta: any[];

    this.serviciosEmpresa = [];
    if (monedaId !== null) {
      this.comparativeService
        .getServices(monedaId, this.selectToChips)
        .subscribe((response) => {
          arrayRespuesta = response.detalles;

          this.getRazonSocial = razonSocial;
          arrayRespuesta.forEach((service) => {
            if (idEmpresa == service.operador.id) {
              this.serviciosEmpresa.push(service);

              this.contadorServicios++;
            }
          });
        });
    }
  }

  getMensajeModal(message: string, type: any) {
    Swal.fire('Mensaje del Sistema', message, type);
  }
  disabledBtn: boolean = true;
  onSelect(id: any) {
    this.enableMoneda = true;
    if (id) {
      this.categoriaSeleccionada = true;
      this.disabledBtn = false;
    } else {
      this.categoriaSeleccionada = false;
      this.disabledBtn = true;
    }

    this.labels = [];
    this.selectToChips = [];
    this.limpiarDatosSelect();
    if (id == 20) {
      this.misDatosSelect['opeTipOpeCircunscripcionId'] =
        this.circunscripcion_aduanera;
      this.misDatosSelect['tipoComercioId'] = this.tipoComercio;
      this.misDatosSelect['tipoServicioId'] = this.tipoServicio;
      this.misDatosSelect['termPortAeropId'] = this.terminalPortuario;

      this.labelsSelect['opeTipOpeCircunscripcionId'] = 'Regiones';
      this.labelsSelect['tipoComercioId'] = 'Tipo Comercio';
      this.labelsSelect['tipoServicioId'] = 'Tipo Servicio';
      this.labelsSelect['termPortAeropId'] = 'Terminal Portuario';
    } else if (id == 1) {
      this.misDatosSelect['opeTipOpeCircunscripcionId'] =
        this.circunscripcion_aduanera;
      this.misDatosSelect['tipoComercioId'] = this.tipoComercio;
      this.misDatosSelect['tipoCargaId'] = this.tipoCarga;

      this.labelsSelect['opeTipOpeCircunscripcionId'] = 'Aduanas';
      this.labelsSelect['tipoComercioId'] = 'Tipo Comercio';
      this.labelsSelect['tipoCargaId'] = 'Tipo Carga';
    } else if (id == 12) {
      this.misDatosSelect['opeTipOpeCircunscripcionId'] =
        this.circunscripcion_aduanera;
      this.misDatosSelect['tipoComercioId'] = this.tipoComercio;
      this.misDatosSelect['tipoCargaId'] = this.tipoCarga;
      this.misDatosSelect['termPortAeropId'] = this.terminalPortuario;
      this.misDatosSelect['tipoViaProcedId'] = this.tipoViaProcedencia;

      this.labelsSelect['opeTipOpeCircunscripcionId'] = 'Aduanas';
      this.labelsSelect['tipoComercioId'] = 'Tipo Comercio';
      this.labelsSelect['tipoCargaId'] = 'Tipo de Carga';
      this.labelsSelect['termPortAeropId'] = 'Terminal Portuario';
      this.labelsSelect['tipoViaProcedId'] = 'Tipo de Vía de procedencia';
    } else if (id == 13) {
      this.misDatosSelect['opeTipOpeCircunscripcionId'] =
        this.circunscripcion_aduanera;
      this.misDatosSelect['tipoCargaId'] = this.tipoCarga;
      this.misDatosSelect['tipoViaProcedId'] = this.tipoViaProcedencia;

      this.labelsSelect['opeTipOpeCircunscripcionId'] = 'Aduanas';
      this.labelsSelect['tipoCargaId'] = 'Tipo de Carga';
      this.labelsSelect['tipoViaProcedId'] = 'Tipo de Vía de procedencia';
    } else if (id == 16) {
      this.misDatosSelect['opeTipOpeCircunscripcionId'] =
        this.circunscripcion_aduanera;
      this.misDatosSelect['tipoComercioId'] = this.tipoComercio;
      this.misDatosSelect['tipoCargaId'] = this.tipoCarga;
      this.misDatosSelect['modTranspId'] = this.modalidadTransporte;
      this.misDatosSelect['modoTransporteId'] = this.modalidadTransporte;
      this.misDatosSelect['origenPaisId'] = this.paises;
      this.misDatosSelect['destinoPaisId'] = this.paises;
      this.misDatosSelect['puertoOrigenId'] = this.puertos;
      this.misDatosSelect['puertoDestinoId'] = this.puertos;

      this.labelsSelect['opeTipOpeCircunscripcionId'] = 'Aduanas';
      this.labelsSelect['tipoComercioId'] = 'Tipo Comercio';
      this.labelsSelect['tipoCargaId'] = 'Tipo de Carga';
      this.labelsSelect['modTranspId'] = '1er Medio de Transporte';
      this.labelsSelect['modoTransporteId'] = '2do Medio de Transporte';
      this.labelsSelect['origenPaisId'] = 'País de Origen';
      this.labelsSelect['destinoPaisId'] = 'País de Destino';
      this.labelsSelect['puertoOrigenId'] = 'Puerto Origen';
      this.labelsSelect['puertoDestinoId'] = 'Puerto Destino';
    } else if (id == 11) {
      this.misDatosSelect['tipoComercioId'] = this.tipoComercio;
      this.misDatosSelect['tipoCargaId'] = this.tipoCarga;
      this.misDatosSelect['origenPaisId'] = this.paises;
      this.misDatosSelect['destinoPaisId'] = this.paises;
      this.misDatosSelect['puertoDestinoId'] = this.puertos;

      this.labelsSelect['tipoComercioId'] = 'Tipo Comercio';
      this.labelsSelect['tipoCargaId'] = 'Tipo de Carga';
      this.labelsSelect['origenPaisId'] = 'País de Origen';
      this.labelsSelect['destinoPaisId'] = 'País de Destino';
      this.labelsSelect['puertoDestinoId'] = 'Puerto Destino';
    } else if (id == 10) {
      this.misDatosSelect['opeTipOpeCircunscripcionId'] =
        this.circunscripcion_aduanera;
      this.misDatosSelect['tipoComercioId'] = this.tipoComercio;
      this.misDatosSelect['tipoCargaId'] = this.tipoCarga;
      this.misDatosSelect['lineaNavieraId'] = this.lineasNavieras;

      this.labelsSelect['opeTipOpeCircunscripcionId'] = 'Aduanas';
      this.labelsSelect['tipoComercioId'] = 'Tipo Comercio';
      this.labelsSelect['tipoCargaId'] = 'Tipo de Carga';
      this.labelsSelect['lineaNavieraId'] = 'Linea Naviera';
    } else if (id == 19) {
      this.misDatosSelect['tipoComercioId'] = this.tipoComercio;
      this.misDatosSelect['tipoCargaId'] = this.tipoCarga;

      this.labelsSelect['tipoComercioId'] = 'Tipo Comercio';
      this.labelsSelect['tipoCargaId'] = 'Tipo de Carga';
    } else if (id == 14) {
      this.misDatosSelect['opeTipOpeCircunscripcionId'] =
        this.circunscripcion_aduanera;
      this.misDatosSelect['tipoComercioId'] = this.tipoComercio;
      this.misDatosSelect['destinoZonaId'] = this.zonas;
      this.misDatosSelect['puertoOrigenId'] = this.puertos;

      this.labelsSelect['opeTipOpeCircunscripcionId'] = 'Aduanas';
      this.labelsSelect['tipoComercioId'] = 'Tipo Comercio';
      this.labelsSelect['destinoZonaId'] = 'Por Zona Destino';
      this.labelsSelect['puertoOrigenId'] = 'Puerto Origen';
    } else if (id == 7) {
      this.misDatosSelect['opeTipOpeCircunscripcionId'] =
        this.circunscripcion_aduanera;
      this.misDatosSelect['tipoComercioId'] = this.tipoComercio;
      this.misDatosSelect['tipoCargaId'] = this.tipoCarga;
      this.misDatosSelect['modoTransporteId'] = this.modalidadTransporte;

      this.labelsSelect['opeTipOpeCircunscripcionId'] = 'Aduanas';
      this.labelsSelect['tipoComercioId'] = 'Tipo Comercio';
      this.labelsSelect['tipoCargaId'] = 'Tipo de Carga';
      this.labelsSelect['modoTransporteId'] = 'Modalidad de transporte';
    } else if (id == 15) {
      this.misDatosSelect['opeTipOpeCircunscripcionId'] =
        this.circunscripcion_aduanera;
      this.misDatosSelect['tipoComercioId'] = this.tipoComercio;
      this.misDatosSelect['categoriaId'] = this.categoria;
      this.misDatosSelect['origenPaisId'] = this.paises;
      this.misDatosSelect['destinoZonaId'] = this.zonas;

      this.labelsSelect['opeTipOpeCircunscripcionId'] = 'Aduanas';
      this.labelsSelect['tipoComercioId'] = 'Tipo Comercio';
      this.labelsSelect['categoriaId'] = 'Categoría';
      this.labelsSelect['origenPaisId'] = 'País de Origen';
      this.labelsSelect['destinoZonaId'] = 'Por Zona Destino';
    } else if (id == 9) {
      this.labels.push('Tipo Comercio', 'Tipo de Carga');
      this.misDatosSelect['tipoComercioId'] = this.tipoComercio;
      this.misDatosSelect['tipoCargaId'] = this.tipoCarga;

      this.labelsSelect['tipoComercioId'] = 'Tipo Comercio';
      this.labelsSelect['tipoCargaId'] = 'Tipo de Carga';
    }
  }

  limpiarDatosSelect() {
    this.misDatosSelect['entidadTipoId'] = null;
    this.misDatosSelect['tipoServicioId'] = null;
    this.misDatosSelect['tipoComercioId'] = null;
    this.misDatosSelect['tipoCargaId'] = null;
    this.misDatosSelect['tipoViaProcedId'] = null;
    this.misDatosSelect['tipoEnvioId'] = null;
    this.misDatosSelect['tipoVehiculoId'] = null;
    this.misDatosSelect['termPortAeropId'] = null;
    this.misDatosSelect['opeTipOpeCircunscripcionId'] = null;
    this.misDatosSelect['lineaNavieraId'] = null;
    this.misDatosSelect['modTranspId'] = null;
    this.misDatosSelect['modoTransporteId'] = null;
    this.misDatosSelect['monedaId'] = null;
    this.misDatosSelect['categoriaId'] = null;
    this.misDatosSelect['origenPaisId'] = null;
    this.misDatosSelect['destinoPaisId'] = null;
    this.misDatosSelect['origenZonaId'] = null;
    this.misDatosSelect['destinoZonaId'] = null;
    this.misDatosSelect['puertoOrigenId'] = null;
    this.misDatosSelect['puertoDestinoId'] = null;
    this.misDatosSelect['denominacionServicio'] = null;
    this.misDatosSelect['ciudadOrigen'] = null;
  }
  cambiarPagina(e: PageEvent) {
    const startIndex = e.pageIndex * e.pageSize;
    const endIndex = startIndex + e.pageSize;
    this.desde = startIndex;
    this.hasta =
      endIndex > this.serviciosEmpresa.length
        ? this.serviciosEmpresa.length
        : endIndex;

    console.log(this.desde);
  }
  pageSizeEmpresa = 8;
  desdeEmpresa: number = 0;
  hastaEmpresa: number = 8;
  contadorEmpresa: number = 0;
  cambiarPaginaEmpresa(e: PageEvent) {
    const startIndex = e.pageIndex * e.pageSize;
    const endIndex = startIndex + e.pageSize;
    this.desdeEmpresa = startIndex;
    this.hastaEmpresa =
      endIndex > this.adminConce.length ? this.adminConce.length : endIndex;

    console.log(this.desde);
  }

  limpiar() {
    location.reload();
    this.selectToChips = [];
    this.adminConce = [];
  }
}
export interface Operator {
  id: number;
  razonSocial: string;
  numeroDocumento: string;
}
