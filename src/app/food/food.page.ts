import { Component, OnInit } from '@angular/core';
import { DataService, Item } from '../services/data.service'; // Import DataService and Item
import { Observable } from 'rxjs'; // Import Observable

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
  standalone: false
})
export class FoodPage implements OnInit {

  restaurants$!: Observable<Item[]>; // Use Observable for async data

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.restaurants$ = this.dataService.getRestaurants(); // Fetch restaurants
  }

}
