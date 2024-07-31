import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MainService } from '../../services/main.service';
import { Root } from '../../../utils/models';
import { AngularMaterialModule } from '../../../utils/material.module';
import { CommonModule } from '@angular/common';
import { Subjects } from '../../subjects/subject';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, AngularMaterialModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private service : MainService,
    private router: Router,
    private subjects : Subjects
    ) { }

  ngOnInit(): void {
    this.service.getMainData().subscribe(
      (data: Root) => {
        console.log(data.results[0].homes);
        this.subjects.home$.next(data.results[0].homes);
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  navigateToOffers(): void {
    this.router.navigate(['/offers']);
  }
}
