import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursetimedrilldownService {


  constructor(private http: HttpClient) { }
  getData() {

   // return this.http.get('/assets/aa.json');

   //return this.http.get('/assets/mergeone.json');
   //return this.http.get('/assets/finalsudarshan.json');
  // return this.http.get('/assets/finalsud.json');
  // return this.http.get('/assets/finalsudarshan1.json');
  // return this.http.get('/assets/finalsud19012022.json');
   return this.http.get('/assets/finalsud25012022.json');
  }
}
