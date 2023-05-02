import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DirectoryService } from '../services/directory.service';
import * as Mapboxgl from 'mapbox-gl';


import { DataService } from '../services/data.Service';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-tab-directory',
  templateUrl: './tab-directory.component.html',
  styleUrls: ['./tab-directory.component.css']
})
export class TabDirectoryComponent implements OnInit {

  constructor(
    private directoryService: DirectoryService,
    private directoryServicios: DirectoryService,
    private dataService: DataService


  ) {

  }
  public places?: any[];
  mapa?: Mapboxgl.Map;
  selectedValue : any ;

  filtro: any;
  contador?: number;
  operador = new FormControl();
  region = new FormControl();
  removable = true;
  selectable = true;
  public toppings: any;
  public toppingList: string[] = [];
  nombreServicio: any;
  numeroDocumento: any;
  public tiposOperadores: any[] = [];
  selectToChips: any[] = [];
  public datellaEntidad: any[] = [];



  letters: string[] = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));


  public circunscripcion_aduanera: any[] = [];

  proveedorSeleccionado = false;
  dropdownSettings = {
    singleSelection: false,
    allowSearchFilter: true
  };


  datosOrdenados: any;

  ngOnInit(): void {


    this.selectedValue = 'Z-a';
    this.buscar(this.filtroOne);
    this.directoryService.getAllTipoOperador().subscribe(response => {
      this.tiposOperadores = response;
      console.log(this.tiposOperadores)


    });

    this.directoryService.getAllCircunscripcionAduanera().subscribe(responseCircunscripcionAduanera => {
      this.circunscripcion_aduanera = responseCircunscripcionAduanera;
    });

  }
  habilitarFiltro = true;
  removeChip(seleccionado: any): void {
    let index = this.selectToChips.indexOf(seleccionado);

    if (index >= 0) {
      this.selectToChips.splice(index, 1);
      this.contadorSelectChips--;
      if (this.region.value?.length > 0) {
        index = this.region.value.findIndex((e: any) => e === seleccionado.valor);

        if (index >= 0) {
          this.region.value.splice(index, 1);
          this.region.patchValue(this.region.value);

        }
      }
      if (this.operador.value?.length > 0) {
        index = this.operador.value.findIndex((e: any) => e === seleccionado.valor);

        if (index >= 0) {
          this.operador.value.splice(index, 1);
          this.operador.patchValue(this.operador.value);

        }
      }
    }
    if(this.selectToChips.length==0){
      this.buscar('');
    }
  }
  private getOperator(data: any[]) {
    var arrayOperator = [];
    for (let i = 0; i < data.length; i++) {
      arrayOperator.push(data[i].razonSocial);
    }
    return arrayOperator;
  }

  contadorSelectChips: number = 0;
  getFiltrosAplicados(code: any, value: any, strTipo: string) {
    this.habilitarFiltro = true;
    let resultado = this.selectToChips.find(e => e.valor === value);
    if (resultado == null) {
      this.selectToChips.push({ code: code, valor: value, tipo: strTipo },);
    } else {
      this.selectToChips = this.selectToChips.filter(e => e.valor !== value);
    }

    this.contadorSelectChips = this.selectToChips.length;
  }
  getFiltrosAplicados2(code: any, value: any, strTipo: string) {

    let resultado = this.selectToChips.find(e => e.valor === value);
    if (resultado == null) {
      this.selectToChips.push({ code: code, valor: value, tipo: strTipo },);
    } else {
      this.selectToChips = this.selectToChips.filter(e => e.valor !== value);
    }
    this.contadorSelectChips = this.selectToChips.length;
  }
  getFiltrosRadio(code: any, value: any, strTipo: string) {
    this.selectedOption = 'Proveedores de Servicios';
    this.proveedorSeleccionado = true;
    let resultado = this.selectToChips.find(e => e.tipo === strTipo);
    if (resultado == null) {
      this.selectToChips.push({ code: code, valor: value, tipo: strTipo },);
    } else {
      this.selectToChips = this.selectToChips.filter(e => e.tipo !== strTipo);
    }
    this.contadorSelectChips = this.selectToChips.length;

  }
  

  todos() {
    location.reload();
  }
  onSelect(id: any) {
  }
  limpiarModal() {
    this.detalleServicioArray = [];
    this.domicilioFiscal = null;
  }
  limpiar() {
    location.reload();
  }

  showMapa = false;


  detalleServicio: any[] = [];
  detalleServicioArray: any[] = [];

  dataFiltro: any[] = [];
  filtroOne: any;
  arrayIds: any = [];
  detalleMapaId: any = [];

  totalItems: number = 0;
  itemsPorPagina: number = 0;
  paginasTotales: number = 0;

  mostrarAviso = false;
  selectedOption = 'Todos';
  ordenarData: any[] = [];
  getMensajeModal(message: string, type: any) {
    Swal.fire('Mensaje del Sistema', message, type);

  }

  ordenamiento(selectedValue : any ) {
    //const target = event.target as HTMLSelectElement;
    //const opcion = target.value;
    this.directoryServicios.getFiltroDirectory(this.selectToChips).subscribe(response => {
      this.datellaEntidad = response.detalles;
      this.coincidencias=this.datellaEntidad;
      if (selectedValue === 'A-z') {
        this.ordenarData = this.coincidencias.sort((a, b) => a.razonSocial.localeCompare(b.razonSocial))
      } else if (selectedValue === 'Z-a') {
        this.ordenarData = this.coincidencias.sort((a, b) => b.razonSocial.localeCompare(a.razonSocial))
      }

      console.log(this.ordenarData);
    });
  }
  coincidencias: Array<any> = [];
  // variable para almacenar las coincidencias
  valorActual = '';
  contadorBuscador : number=0;
  
  buscarCoincidencias() {
    this.contadorLetra=0;
    this.selectToChips=[];
    const valorActual = this.valorActual.toLowerCase().trim();
    if (valorActual === '') {
      this.coincidencias = this.ordenarData;
    } else {
      this.coincidencias = this.ordenarData.filter(item => {
        const razonSocial = item.razonSocial.toLowerCase();
        const numeroDocumento = item.numeroDocumento.toString();
        return razonSocial.includes(valorActual) || numeroDocumento.includes(valorActual);
      });

      this.contadorBuscador=this.coincidencias.length;
      if(this.contadorBuscador==0){
        this.mostrarAviso=true;
      }
    }
    if (this.valorActual && this.valorActual.trim() !== '' && !this.selectToChips.some(item => item.valor === this.valorActual)) {
      this.selectToChips.push({ valor: this.valorActual.trim() });
      this.valorActual = '';
    }
    this.contadorSelectChips = this.selectToChips.length;
  }
  
  listarTodo() {
    location.reload();
  }
  ocultarDivBuscar = false;
  buscar(filtroOne: any): void {
    if(this.valorActual.length>0){
      this.buscarCoincidencias();
    }else{
      this.contadorBuscador=0;
      this.contadorLetra=0;
      this.arrayIds = [];
      console.log(this.selectToChips)
      const tipoOperadorId = this.selectToChips[0]?.code;
      this.datellaEntidad = [];
      if (tipoOperadorId !== null) {
        this.directoryServicios.getFiltroDirectory(this.selectToChips).subscribe(response => {
  
          console.log("este es para filtros " + response.itemsPorPagina);
          this.datellaEntidad = response.detalles;
  
          this.ordenarData = this.datellaEntidad.sort((a, b) => a.razonSocial.localeCompare(b.razonSocial))
  
        
          
          console.log(this.ordenarData)
  
          if (this.datellaEntidad.length == 0) {
            this.mostrarAviso = true;
            //this.getMensajeModal('No hay información para mostrar', 'info');
          }else{
            this.mostrarAviso=false;
          }
          this.dataFiltro = this.getOperator(this.datellaEntidad);
          for (let i = 0; i < this.datellaEntidad.length; i++) {
            this.arrayIds.push(this.datellaEntidad[i].id)
          }
          console.log("Id ->" + this.arrayIds);
  
          if ((filtroOne === '') || (filtroOne === null) ||
            (filtroOne === undefined)) {
            this.ordenarData = this.ordenarData;
  
          } else {
            this.ordenarData = this.ordenarData.filter((data: any) => {
              return ((filtroOne === undefined || filtroOne === '') ? true : data.razonSocial.toString() === filtroOne);
            });
          }
          this.coincidencias=this.ordenarData;
          console.log("contador filtrar"+this.coincidencias.length);
          
          this.paginasTotales = response.paginasTotales;
          this.totalItems = response.totalItems;
          this.itemsPorPagina = response.itemsPorPagina;
  
          console.log("paginastotales " + this.paginasTotales)
  
        });
      }
  
    }
    
   
  }
 contadorLetra : number=0;
  buscarPorLetra(letra: string) {
    this.selectToChips=[];
    this.contadorBuscador=0;
    this.datellaEntidad = [];
    this.ordenarData = [];
    this.directoryServicios.getFiltroDirectory(this.selectToChips).subscribe(response => {
      this.ordenarData = response.detalles;
      this.coincidencias=this.ordenarData;
      this.coincidencias = this.coincidencias.filter((data: any) => {
        const primeraLetra = data.razonSocial.toString()[0];
        return ((letra === undefined || letra === '') ? true : primeraLetra === letra);

      });
      const letraSeleccionada = { valor: letra };
      this.selectToChips.push(letraSeleccionada);
      this.contadorLetra=this.coincidencias.length;
      console.log(this.contadorLetra);
      if (this.coincidencias.length === 0) {
        this.mostrarAviso = true;

      } else {
        this.mostrarAviso = false;


      }

    });
    this.contadorSelectChips = this.selectToChips.length+1;
  }

  getId(data: any[]) {

    var arrayId: any = [];

    for (let index = 0; index < data.length; index++) {
      arrayId = data[index].id;

    }
    return arrayId;

  }
  domicilioFiscal: any;


  getMasInformacion(detalleEntidadId: any): void {

    this.detalleServicioArray = [];
    console.log(detalleEntidadId)
    this.directoryServicios.getDetalleOperador(detalleEntidadId).subscribe(responseDetalle => {

      this.detalleServicio = responseDetalle;
      this.detalleServicioArray.push(this.detalleServicio);
      console.log(this.detalleServicioArray);

      this.domicilioFiscal = this.detalleServicioArray[0].domicilioFiscal;
      console.log(this.domicilioFiscal)

      this.dataService.setDomicilioFiscal(this.domicilioFiscal);
      // this.openDialog();


    });

  }
  pageSize = 10;
  desde: number = 0;
  hasta: number = 10;

  cambiarPagina(e: PageEvent) {
    const startIndex = e.pageIndex * e.pageSize;
    const endIndex = startIndex + e.pageSize;
    this.desde = startIndex;
    this.hasta = endIndex > this.datellaEntidad.length ? this.datellaEntidad.length : endIndex;

    console.log(this.desde);
  }


  selectedRadio = 'Todos';




}

