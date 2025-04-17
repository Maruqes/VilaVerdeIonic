import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodPageRoutingModule } from './food-routing.module';
import { SharedModule } from '../shared/shared.module';

import { FoodPage } from './food.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodPageRoutingModule,
    SharedModule
  ],
  declarations: [FoodPage]
})
export class FoodPageModule { }
