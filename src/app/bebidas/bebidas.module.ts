import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BebidasPageRoutingModule } from './bebidas-routing.module'; // Changed import
import { SharedModule } from '../shared/shared.module';

import { BebidasPage } from './bebidas.page'; // Changed import

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BebidasPageRoutingModule, // Changed module
        SharedModule
    ],
    declarations: [BebidasPage] // Changed declaration
})
export class BebidasPageModule { } // Renamed class
