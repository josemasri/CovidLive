import { Component, OnInit, OnDestroy } from '@angular/core';
import { CovidService } from '../../../services/covid/covid.service';
import { Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

  subs: Subscription;
  date = new Date();
  res: any;
  res2: any;

  constructor(
    private covidService: CovidService
  ) { }

  ngOnInit() {
    // Obtener información general
    this.subs = this.covidService.getDataAll()
    .subscribe(res => {
      this.res = res;
      console.log(res);
    });
    // Obtener Información de México
    this.covidService.getDataCountry('mexico')
    .subscribe(res => {
      this.res2 = res;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
