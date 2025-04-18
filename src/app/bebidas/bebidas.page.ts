import { Component, OnInit } from '@angular/core';
import { DataService, Item } from '../services/data.service'; // Import DataService and Item
import { Observable } from 'rxjs'; // Import Observable

@Component({
    selector: 'app-bebidas', // Changed selector
    templateUrl: './bebidas.page.html', // Changed template URL
    styleUrls: ['./bebidas.page.scss'], // Changed style URL
    standalone: false
})
export class BebidasPage implements OnInit { // Renamed class

    bars$!: Observable<Item[]>; // Use Observable for async data

    constructor(private dataService: DataService) { } // Inject DataService

    ngOnInit() {
        this.bars$ = this.dataService.getBars(); // Fetch bars
    }

}
