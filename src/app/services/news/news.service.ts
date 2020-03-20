import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  apiURL = environment.apiURLNews;

  constructor(
    private http: HttpClient
  ) { }


  getNews(language = 'es', page = 1) {
    return this.http.get(`${this.apiURL}/everything?language=${language}&q=covid&page=${page}&apiKey=${environment.newsAPIKey}`);
  }
}
