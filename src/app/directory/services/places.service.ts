import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Feature, PlacesResponse } from "../interfaces/places";
import { PlacesApiClient } from "../api";
import { MapService } from "./map.service";




@Injectable({
    providedIn: 'root'
})

export class PlacesService  {
  public places: Feature[] = [];



constructor(private http: HttpClient,
  private placesApi: PlacesApiClient,
  private mapService : MapService){
    

}
public getPlacesByQuery(query: string = ' '): Observable <any> {
  return this.http.get<any>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=1&proximity=ip&language=es&access_token=pk.eyJ1IjoiZWRpbnNvbjI3IiwiYSI6ImNsZnJkcWJjNzA3aHY0M254OWl3N3ZkMDkifQ.FXVTsVy_ZboA__Vva0Z-fA`);


}


}