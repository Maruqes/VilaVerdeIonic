import { Component, OnInit } from '@angular/core';
import { DataService, Item } from '../services/data.service'; // Import DataService and Item
import { Observable } from 'rxjs'; // Import Observable
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
  standalone: false
})
export class FoodPage implements OnInit {

  restaurants$!: Observable<Item[]>; // Use Observable for async data

  constructor(
    private dataService: DataService,
    private router: Router // Inject Router
  ) { }

  ngOnInit() {
    this.restaurants$ = this.dataService.getRestaurants(); // Fetch restaurants
  }

  // Function to navigate to item detail page
  goToItemDetail(itemId: number) {
    this.router.navigate(['/item-detail', itemId]);
  }

}
