import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ItemExtra { // Define interface for extra details
  fotos: string[];
  descricao: string;
}

export interface Item {
  id: number;
  name: string;
  image: string;
  description: string;
  extra?: ItemExtra; // Add optional extra property
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

  // New method to get item by ID
  getItemById(id: number): Observable<Item | undefined> {
    return this.http.get<any>(this.dataUrl).pipe(
      map(data => {
        const allItems = [...data.restaurants, ...data.bars, ...data.popular];
        return allItems.find(item => item.id === id);
      })
    );
  }
}
