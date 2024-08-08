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

      const dataId = this.route.snapshot.paramMap.get('id');
      if (dataId) {
        console.log('dataId from URL:', dataId); // Verifica que dataId tenga un valor
        localStorage.setItem('dataId', String(dataId)); // Asegúrate de que dataId sea una cadena
        this.fetchData(dataId);
      } else {
        const storedDataId = localStorage.getItem('dataId');
        if (storedDataId) {
          console.log('dataId from localStorage:', storedDataId);
          this.fetchData(storedDataId);
        } else {
          console.error('No dataId found in URL or localStorage');
          this.router.navigate(['/error']); // Redirige a una página de error si no hay dataId
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
