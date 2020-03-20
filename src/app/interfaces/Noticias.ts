export interface ResNoticia {
  status: string;
  totalResults: number;
  articles: Noticia[];
}

export interface Noticia {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface Source {
  id?: any;
  name: string;
}