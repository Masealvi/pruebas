import { Component, Input, OnInit } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import { Marker, Popup } from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { DirectoryService, PlacesService } from '../../services';
@Component({
  selector: 'app-map-all',
  templateUrl: './map-all.component.html',
  styleUrls: ['./map-all.component.css']
})
export class MapAllComponent implements OnInit {
  @Input() detalleMapaId?: any[];

  @Input() getRazonSocial?: any[];

  arrayDirecciones: any[] = [];
  AllDirecciones: any[] = [];
 
  allDatos: any[]=[];
  constructor(private directoryService: DirectoryService,
    private placesService: PlacesService) {

    this.arrayDirecciones;
    console.log(this.AllDirecciones)

  }
  public mapa?: mapboxgl.Map;

 
  async ngOnInit() {
 console.log(this.getRazonSocial)
    // Crear el objeto Map sólo una vez
    this.mapa = new Mapboxgl.Map({
      container: 'mapa-mapbox', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-76.54977020600413, -9.173822041654363],
      accessToken: environment.apiKey,
      zoom: 5, // starting zoom

    });

    if (this.detalleMapaId) {

      for (const id of this.detalleMapaId) {
        this.directoryService.getDetalleOperador(id).subscribe(detalle => {     
          this.allDatos.push(detalle);
          for (const direccion of this.allDatos) {
            this.placesService.getPlacesByQuery(direccion.domicilioFiscal).subscribe(placesResponse => {
              console.log(placesResponse)
              const center = placesResponse.features[0].center;
              if (this.mapa) {

                const popup = new Popup()
                  .setHTML(`
                <h5><strong>${direccion.razonSocial}</strong></h5>
                <span> <strong>RUC: </strong>${direccion.numeroDocumento}</span>
                <br>
                <span><strong>TELEFONO: </strong>${direccion.contacto.celular}</span>
                <br>
                <span><strong>EMAIL: </strong>${direccion.contacto.correo}</span>
                <br>
                <span><strong>SITIO WEB: </strong>${direccion.contacto.sitioWeb}</span>
              `);
                new Marker({ color: 'red' })
                  .setLngLat(center)
                  .setPopup(popup)
                  .addTo(this.mapa);
              }

            });
          }
        });
      }
    }
  }



}
