import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Subjects {
  home$ = new BehaviorSubject<any[]>([]);
}
