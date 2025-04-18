import { Component, OnInit } from '@angular/core';
import { DataService, Item } from '../services/data.service'; // Import DataService and Item
import { Observable } from 'rxjs'; // Import Observable
import { Router } from '@angular/router'; // Import Router

@Component({
    selector: 'app-bebidas', // Changed selector
    templateUrl: './bebidas.page.html', // Changed template URL
    styleUrls: ['./bebidas.page.scss'], // Changed style URL
    standalone: false
})
export class BebidasPage implements OnInit { // Renamed class

    bars$!: Observable<Item[]>; // Use Observable for async data

    constructor(
        private dataService: DataService, // Inject DataService
        private router: Router // Inject Router
    ) { }

    ngOnInit() {
        this.bars$ = this.dataService.getBars(); // Fetch bars
    }

    // Function to navigate to item detail page
    goToItemDetail(itemId: number) {
        this.router.navigate(['/item-detail', itemId]);
    }

}
