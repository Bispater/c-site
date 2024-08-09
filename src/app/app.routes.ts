import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OffersViewComponent } from './pages/offers-view/offers-view.component';


export const routes: Routes = [
    { path: 'home/:id', component: HomeComponent },
    { path: 'offers', component: OffersViewComponent },
    { path: '**', redirectTo: 'home/' }
  ];
