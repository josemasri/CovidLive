import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { NewsService } from '../../../services/news/news.service';
import { ResNoticia, Noticia } from '../../../interfaces/Noticias';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  noticias: Noticia[];
  page = 1;

  constructor(
    private newsService: NewsService,
    private iab: InAppBrowser
  ) {}

    ngOnInit() {
      this.page = 1;
      this.newsService.getNews()
      .subscribe((res: ResNoticia) => {
        console.log(res);
        this.noticias = res.articles;
      });
    }


    doRefresh(event) {
      this.page = 1;
      this.newsService.getNews()
      .subscribe((res: ResNoticia) => {
        console.log(res);
        this.noticias = res.articles;
        event.target.complete();
      });
    }

    loadMoreNews(event) {
      this.page++;
      this.newsService.getNews('es', this.page)
      .subscribe((res: ResNoticia) => {
        console.log(res);
        this.noticias.push(...res.articles);
        event.target.complete();
      });
    }

    openNoticia(url: string) {
      const browser = this.iab.create(url, '_system');
    }

}
