import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router'; // Import RouterModule

import { FooterTabsComponent } from './footer-tabs/footer-tabs.component';

@NgModule({
    declarations: [FooterTabsComponent],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule // Add RouterModule here
    ],
    exports: [FooterTabsComponent]
})
export class SharedModule { }
