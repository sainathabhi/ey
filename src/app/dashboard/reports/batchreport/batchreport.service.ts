import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BatchreportService {

  constructor(private http: HttpClient) { }
  getBatchReportData() {
    //return this.http.get('/assets/finalsudarshan.json');
  //  return this.http.get('/assets/finalsud.json');
  //return this.http.get('/assets/finalsudarshan1.json');
  //return this.http.get('/assets/finalsud19012022.json');
  return this.http.get('/assets/finalsud25012022.json');
  }
  batchData()
  {
 var payload = "{\r\n\r\n    \"request\": {\r\n\r\n        \"filters\": {\r\n\r\n            \"status\": 1,\r\n\r\n            \"createdFor\": [\r\n\r\n                \"0129894906672087041553\"\r\n\r\n            ]\r\n\r\n        },\r\n\r\n        \"fields\": [\r\n\r\n            \"courseId\",\r\n\r\n            \"batchId\",\r\n\r\n            \"startDate\",\r\n\r\n            \"enrollmentEndDate\",\r\n\r\n            \"endDate\",\r\n\r\n            \"status\",\r\n\r\n            \"createdFor\",\r\n\r\n            \"name\"\r\n\r\n        ],\r\n\r\n        \"limit\": 2000\r\n\r\n    }\r\n\r\n}"
 var headers = {
    'content-type': "application/json",
    'authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJOUHNSQjN5VXlIVUJuSWpsZkRPZzQ4T0EzU3N1YThkZCJ9.5fP8lXHNnb1ZG1SkPsPlPs748lVXiQNlk_RmrfmmLGQ",
    'cache-control': "no-cache",
    'postman-token': "8c737468-208a-8594-fb9e-5a63e043ccae"
    }
    return this.http.post('https://diksha.gov.in/learner/course/v1/batch/list', payload, {headers});


  }
}
