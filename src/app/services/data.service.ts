import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Item {
  name: string;
  image: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataUrl = 'assets/data.json'; // Path to your JSON file

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }

  getRestaurants(): Observable<Item[]> {
    return this.http.get<any>(this.dataUrl).pipe(
      map(data => data.restaurants)
    );
  }

  getBars(): Observable<Item[]> {
    return this.http.get<any>(this.dataUrl).pipe(
      map(data => data.bars)
    );
  }

  getPopular(): Observable<Item[]> {
    return this.http.get<any>(this.dataUrl).pipe(
      map(data => data.popular)
    );
  }
}
