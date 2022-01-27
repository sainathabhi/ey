import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThirdcategoryreportService {

  constructor(private http: HttpClient) { }
  getData() {
    //return this.http.get('/assets/finalsudarshan1.json');
    //return this.http.get('/assets/finalsud.json');
    return this.http.get('/assets/finalsud25012022.json');
  }

}
