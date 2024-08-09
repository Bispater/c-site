import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MainService } from '../../services/main.service';
import { Root } from '../../../utils/models';
import { AngularMaterialModule } from '../../../utils/material.module';
import { CommonModule } from '@angular/common';
import { Subjects } from '../../subjects/subject';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, AngularMaterialModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {

  constructor(
    private service: MainService,
    private route: ActivatedRoute,
    private router: Router,
    private subjects: Subjects
  ) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      let dataId = '53';
      this.route.params.subscribe( params => {
        dataId = params['id'];
      })
      console.log("id params from url ", dataId);
      if (dataId) {
        console.log('dataId from URL:', dataId); 
        localStorage.setItem('dataId', String(dataId)); 
        this.fetchData(dataId);
      } else {
        const storedDataId = localStorage.getItem('dataId');
        if (storedDataId) {
          console.log('dataId from localStorage:', storedDataId);
          this.fetchData(storedDataId);
        } else {
          console.error('No dataId found in URL or localStorage');
          this.router.navigate(['/error']); 
        }
      }
    }
  }

  fetchData(dataId: string): void {
    this.service.getMainData(dataId).subscribe(
      (data: Root) => {
        console.log('Data fetched:', data);
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
