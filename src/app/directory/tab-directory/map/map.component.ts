import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import { Marker, Popup } from 'mapbox-gl';

//import {Map,Popup,Marker} from 'mapbox-gl';
import { PlacesService } from '../../services/places.service';

import { environment } from 'src/environments/environment';
import { DataService } from '../../services/data.Service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  public mapa?: mapboxgl.Map;
  @Input() domicilioFiscal?: any;
  direccion ="hospital regional lambayeque";
  constructor(private placesService: PlacesService,
    private dataService : DataService) {
    
    
  }
  async ngOnInit(){
 
    this.domicilioFiscal=this.dataService.getDomicilioFiscal();
    let center02=await this.onQueryChanged(this.domicilioFiscal);
    console.log(center02)
      if(center02 && center02.length>0){
        const center = center02;       
        if(center){         
        this.mapa = new Mapboxgl.Map({
          container: 'mapa-mapbox', 
          style: 'mapbox://styles/mapbox/streets-v12', 
          center: [center[0], center[1]],
          accessToken: environment.apiKey,
          zoom: 10, 
        });     
              
          new Marker({ color: 'red' })
            .setLngLat([center[0], center[1]])
            
            .addTo(this.mapa);
      }
  
    }
  }


  async onQueryChanged(query: string = '') {
    let center01: any[]=[];
    console.log(query);
    const dire = await this.placesService.getPlacesByQuery(query).toPromise();
    
    if (dire && dire.features && dire.features.length > 0 && dire.features[0].center) {
      center01 = dire.features[0].center;
      
    }
    
    return center01;
  }
  


}
