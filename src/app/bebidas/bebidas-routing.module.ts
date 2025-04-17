import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BebidasPage } from './bebidas.page'; // Changed import

const routes: Routes = [
    {
        path: '',
        component: BebidasPage // Changed component
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BebidasPageRoutingModule { } // Renamed class
