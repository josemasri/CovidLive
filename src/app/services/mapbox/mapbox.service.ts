import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  apiURL = environment.apiURLMapbox;

  constructor(
    private http: HttpClient
  ) { }


  getCountryCoordinates(country: string) {
    return this.http.get<any>(`${this.apiURL}/${country}.json?access_token=${environment.mapboxAPIKey}`);
  }
}
