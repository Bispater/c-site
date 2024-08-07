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
    private service : MainService,
    private route: ActivatedRoute,
    private router: Router,
    private subjects : Subjects
    ) { }

    ngOnInit(): void {
      let dataId = this.route.snapshot.paramMap.get('id') || localStorage.getItem('dataId');
      console.log("data id from home ", dataId);
      if (dataId) {
        localStorage.setItem('dataId', dataId); 
        this.service.getMainData(dataId).subscribe(
          (data: Root) => {
            console.log(data.results[0].homes);
            this.subjects.home$.next(data.results[0].homes);
          },
          (error) => {
            console.error('Error fetching data', error);
          }
        );
      } else {
        console.error('No data ID found');
      }
    }

  navigateToOffers(): void {
    this.router.navigate(['/offers']);
  }
}
