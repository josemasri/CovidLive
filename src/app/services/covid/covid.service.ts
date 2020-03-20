import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResCovidCountry } from '../../interfaces/Covid';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  apiURL = environment.apiURLCovid;
  constructor(
    private http: HttpClient
  ) { }


  getDataAll() {
    return this.http.get(`${this.apiURL}/all`);
  }


  getAllCountriesData() {
    return this.http.get<ResCovidCountry[]>(`${this.apiURL}/countries`);
  }

  getDataCountry(country: string) {
    return this.http.get(`${this.apiURL}/countries/${country}`);
  }
}
