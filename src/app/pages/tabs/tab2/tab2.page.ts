import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CovidService } from '../../../services/covid/covid.service';
import { ResCovidCountry } from '../../../interfaces/Covid';
import { MapboxService } from '../../../services/mapbox/mapbox.service';

declare var mapboxgl;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  geojson = {
    type: 'FeatureCollection',
    features: []
  };

  infoArray = [];


  constructor(
    private covidService: CovidService,
    private mapboxService: MapboxService
  ) { }

  async ngOnInit() {
    this.covidService.getAllCountriesData()
      .subscribe(async res => {
        await this.crearGeoJSON(res);
        this.initializeMapbox();
      });
  }


  async crearGeoJSON(res: ResCovidCountry[]) {
    console.log(res);
    console.log(this.geojson);
    res.forEach(async resCovidCountry => {
      const geometry = await this.getCountryCoordinates(resCovidCountry.country);
      this.geojson.features.push({
        type: 'Feature',
        geometry,
        properties: {
          title: 'Mapbox',
          description: `${resCovidCountry.country}:<br>Casos ${resCovidCountry.cases}<br>
          Activos ${resCovidCountry.active}<br>Muertes ${resCovidCountry.deaths}`
        }
      });
    });
    return true;
  }


  initializeMapbox() {
    mapboxgl.accessToken = environment.mapboxAPIKey;

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-96, 37.8],
      zoom: 1
    });

    map.on('load', () => {
      map.loadImage(
        'https://img.icons8.com/color/96/000000/fire-alarm-button.png', (error, image) => {
          if (error) {
            throw error;
          }
          map.addImage('marker', image);
          map.addSource('point', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: this.geojson.features
            }
          });
          map.addLayer({
            id: 'points',
            type: 'symbol',
            source: 'point',
            layout: {
              'icon-image': 'marker',
              'icon-size': 0.3
            }
          });
        }
      );
    });

    map.on('click', 'points', (e) => {
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
          `<p style="color: #000;">${e.features[0].properties.description}</p>
        `)
        .addTo(map);
    });


    // Recargar mapa
    map.on('load', () => {
      map.resize();
    });

    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', 'states-layer', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'states-layer', () => {
      map.getCanvas().style.cursor = '';
    });
  }

  async getCountryCoordinates(country: string) {
    const res = await this.mapboxService
      .getCountryCoordinates(country).toPromise();
    return res.features[0].geometry;
  }
}
