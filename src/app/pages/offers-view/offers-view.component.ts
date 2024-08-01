import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../../../utils/material.module';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../../components/image-dialog/image-dialog.component';
import { Subjects } from '../../subjects/subject';
import { Home } from '../../../utils/models';

@Component({
  selector: 'app-offers-view',
  standalone: true,
  imports: [CommonModule, RouterModule, AngularMaterialModule],
  templateUrl: './offers-view.component.html',
  styleUrl: './offers-view.component.scss'
})
export class OffersViewComponent implements OnInit {

  offers: any[] = [];
  homes: Home[] = [];

  filteredHomes: any[] = [];
  currentFilter: string = '';
  isLoading: boolean = true;

  iconMap: { [key: string]: string } = {
    'Dúo Pack': 'assets/icon_duo_24.png',
    'Internet Fibra': 'assets/icon_fibra_24.png',
    'Triple Pack Internet': 'assets/icon_tri_pack_24.png'
  };

  constructor(
    private location: Location,
    private dialog: MatDialog,
    private router: Router,
    private subjects : Subjects
    ) { }

  ngOnInit(): void {

    this.subjects.home$.subscribe({
      next: (data) => {
        if(data.length > 0){
          this.homes = data;
          console.log("home data? ", data);
          this.isLoading = false; 
          this.processOffers();
        }
      },
      error: (error) => {
        console.error('Error receiving data', error);
        this.isLoading = false; 
      }
    });

    setTimeout(() => {
      console.log("evaluating time : ", this.isLoading);

      if (this.isLoading) {
        console.log("sended")
        this.router.navigate(['/']);
      }
    }, 5000); 
  }

  getIconSrc(name_button: string): string {
    return this.iconMap[name_button] || 'assets/default_icon.png';
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
      });
    } else {
      console.error('No images found with the specified orientation.');
    }
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
  
}
