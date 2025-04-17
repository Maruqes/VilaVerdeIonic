import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-bebidas', // Changed selector
    templateUrl: './bebidas.page.html', // Changed template URL
    styleUrls: ['./bebidas.page.scss'], // Changed style URL
    standalone: false
})
export class BebidasPage implements OnInit { // Renamed class

    constructor() { }

    ngOnInit() {
    }

}
