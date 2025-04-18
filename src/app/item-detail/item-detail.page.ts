import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { DataService, Item } from '../services/data.service'; // Import DataService and Item interface
import { Observable } from 'rxjs'; // Import Observable

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
  standalone: false
})
export class ItemDetailPage implements OnInit {

  item$: Observable<Item | undefined> | undefined; // Observable to hold item data

  constructor(
    private route: ActivatedRoute, // Inject ActivatedRoute
    private dataService: DataService // Inject DataService
  ) { }

  ngOnInit() {
    // Get the ID from the route parameters
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const itemId = +idParam; // Convert string ID to number
      this.item$ = this.dataService.getItemById(itemId); // Fetch item data
    } else {
      // Handle the case where ID is not present or invalid, maybe redirect or show an error
      console.error('Item ID not found in route parameters');
    }
  }

}
