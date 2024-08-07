import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OffersViewComponent } from './pages/offers-view/offers-view.component';

export const routes: Routes = [
    { path: ':id', component: HomeComponent },
    { path: '', component: HomeComponent },
    { path: 'offers', component: OffersViewComponent },
    { path: '**', redirectTo: '/' }
];