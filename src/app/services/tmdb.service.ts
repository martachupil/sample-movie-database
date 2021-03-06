import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export enum SortType {
  Popularity = 'popularity'
}

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private readonly BASE_URL = environment.tmdbUrl;
  private readonly API_KEY = environment.tmdbKey;

  constructor(private http: HttpClient) { }

  private getFullUrl(path: string) {
    return `${this.BASE_URL}/${path}?api_key=${this.API_KEY}`;
  }

  formatImageUrl(imgUrl: string) {
    return 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + imgUrl;
  }

  getMovieById(movieId: string) {
    const url = this.getFullUrl(`movie/${movieId}`);
    return this.http.get(url).toPromise();
  }

  discover(sortBy: SortType, sortOrder: SortOrder) {
    const url = this.getFullUrl('discover/movie');

    const params = (new HttpParams()).set('sort_by', `${sortBy}.${sortOrder}`);
    return this.http.get(url, { params }).toPromise();
  }
}
