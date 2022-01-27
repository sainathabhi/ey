import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryreportService {

  constructor(private http: HttpClient) { }
  getData() {
    //return this.http.get('/assets/finalsudarshan1.json');
   // return this.http.get('/assets/finalsud.json');
   return this.http.get('/assets/finalsud25012022.json');
  }
}
