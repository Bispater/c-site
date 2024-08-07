import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Root } from '../../utils/models';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  urlBase = 'https://rinnolab.cl/catalogue/api/stats/';
  token = '2b6fa9689d2a7fd69608d1d36db04e2cf52cae9c';

  constructor(private http: HttpClient) { }

  getMainData(id: string): Observable<Root> {
    console.log("main id ?", id);
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.token}`
    });

    return this.http.get<Root>(`${this.urlBase}${id}`, { headers });
  }

}
