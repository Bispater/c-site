import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MainService } from '../../services/main.service';
import { Root } from '../../../utils/models';
import { AngularMaterialModule } from '../../../utils/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, AngularMaterialModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  isLoading = true;
  homes: any[] = []; 


  constructor(
    private service : MainService,
    private router: Router  
    ) { }

  ngOnInit(): void {
    this.service.getMainData().subscribe(
      (data: Root) => {
        console.log(data.results[0].homes);
        this.homes = data.results[0].homes;
        this.isLoading = false; 
      },
      (error) => {
        console.error('Error fetching data', error);
        this.isLoading = false; 
      }
    );
  }

  navigateToOffers(): void {
    this.router.navigate(['/offers'], { state: { homes: this.homes } });
  }
}
