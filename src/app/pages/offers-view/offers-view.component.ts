import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../../../utils/material.module';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../../components/image-dialog/image-dialog.component';

@Component({
  selector: 'app-offers-view',
  standalone: true,
  imports: [CommonModule, RouterModule, AngularMaterialModule],
  templateUrl: './offers-view.component.html',
  styleUrl: './offers-view.component.scss'
})
export class OffersViewComponent implements OnInit {

  homes: any[] = []; 
  offers: any[] = [];

  filteredHomes: any[] = [];
  currentFilter: string = '';


  constructor(
    private location: Location,
    private dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {

    const navigation = this.location.getState() as { homes: any[] };
    if (navigation && navigation.homes) {
      this.homes = navigation.homes;
      console.log(this.homes);
      this.processOffers();
    }
  }

  filterOffers(filter: string): void {
    this.currentFilter = filter;
    if (filter === '') {
      this.filteredHomes = this.homes;
    } else {
      this.filteredHomes = this.homes.filter(home => home.name_button === filter);
    }
  }


  processOffers(): void {
    this.offers = this.homes.flatMap(home => home.home_type.flatMap((type: { home_detail: any; }) => type.home_detail));
    console.log(this.offers);
    this.filteredHomes = this.homes;
  }

  showImageDialog(homeType: any[]): void {
    const images = homeType
      .filter(element => element.image_orientation === 'V')
      .map(element => element.image);
    
    if (images.length > 0) {
      this.dialog.open(ImageDialogComponent, {
        data: { images: images },
        width: '100vw',
        height: '100vh',
      });
    } else {
      console.error('No images found with the specified orientation.');
    }
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
  
}
