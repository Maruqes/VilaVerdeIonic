import { Component, OnInit } from '@angular/core';
import { DataService, Item } from '../services/data.service'; // Import DataService and Item
import { Observable } from 'rxjs'; // Import Observable

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: false
})
export class MainPage implements OnInit {

  popularItems$!: Observable<Item[]>; // Use Observable for async data

  constructor(private dataService: DataService) { } // Inject DataService

  ngOnInit() {
    this.popularItems$ = this.dataService.getPopular(); // Fetch popular items
  }

}
