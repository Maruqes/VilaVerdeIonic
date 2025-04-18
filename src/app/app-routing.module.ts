import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainPageModule)
  },
  {
    path: 'food',
    loadChildren: () => import('./food/food.module').then(m => m.FoodPageModule)
  },
  {
    path: 'bebidas', // Add new route for Bebidas
    loadChildren: () => import('./bebidas/bebidas.module').then(m => m.BebidasPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'item-detail/:id', // Add :id parameter to the route
    loadChildren: () => import('./item-detail/item-detail.module').then(m => m.ItemDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
