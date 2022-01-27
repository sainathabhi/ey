import { CategoryreportService } from './categoryreport.service';
import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import * as _ from 'lodash-es';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"
@Component({
  selector: 'app-categoryreport',
  templateUrl: './categoryreport.component.html',
  styleUrls: ['./categoryreport.component.scss']
})
export class CategoryreportComponent implements OnInit {
  summeryResult: any = new Array()
  allCourseWiseData: any = new Array()
  totalGroupByDistrictResultArray: any = new Array()
  Pre_District_name: any = new Array()
  userSubTypeResult: any = new Array()
  userSubTypeResults: any = new Array()
  totalsubtype: any = new Array()
  fotterTotal: any = new Array()
  keysss: any = new Array()
  colsUser:  any = new Array()
  columns:  any = new Array()
  constructor(private serv:CategoryreportService) { }

  ngOnInit(): void {
   this.summeryData();
   
  }
  summeryData()
  {
    this.serv.getData().subscribe((res)=>{
       console.log(res)
        this.summeryResult=res;
        
    this.summeryResult.forEach(function(item:any) {
      if( (item['User Sub Type']!="Lab Technician") && (item['User Sub Type']!="Nurses") && (item['User Sub Type']!="Doctor (Allopathy)") && (item['User Sub Type']!="Pharmacist") && 
      (item['User Sub Type']!="Other Health Worker") && (item['User Sub Type']!="ANMs") && (item['User Sub Type']!="ASHA Health worker") &&
       (item['User Sub Type']!="Dentist & Dental Students") && (item['User Sub Type']!="Psychosocial HealthProf") && 
        (item['User Sub Type']!="Sanitation Prof.") && (item['User Sub Type']!="RWA representative") && (item['User Sub Type']!="Student/ Intern") 
        && (item['User Sub Type']!="Police") && (item['User Sub Type']!="District Administrator") && (item['User Sub Type']!="AYUSH Professional") 
        && (item['User Sub Type']!="Allied & Healthcare Professional") && (item['User Sub Type']!="Rehabilitation Prof.") && (item['User Sub Type']!="NCC Cadets") && (item['User Sub Type']!="NSS Volunteers") 
        && (item['User Sub Type']!="Other Volunteer") && (item['User Sub Type']!="Common citizen") && (item['User Sub Type']!="NYKS Volunteers") && (item['User Sub Type']!="NGO Volunteer")
        && (item['User Sub Type']!="Volunteer BSG") && (item['User Sub Type']!="")) {
          item['User Sub Type'] = 'OtherCandidate'
      }
    });
        var groupByDistrict = function(xs:any, key:any) {
        return xs.reduce(function(rv:any, x:any) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
          }, {});
        };
        var totalGroupByDistrict=groupByDistrict(this.summeryResult, 'District')
        this.totalGroupByDistrictResultArray = Object.entries(totalGroupByDistrict)  
        console.log(this.totalGroupByDistrictResultArray)     
        this.totalGroupByDistrictResultArray.forEach((y:any) =>
          {   
         var counts = y[1].reduce((p:any, c:any) => {
              var name =c['User Sub Type'];
              if (!p.hasOwnProperty(name)) {
                p[name] = 0;
              }
              p[name]++;
              return p;
            }, {});
           var abcd=this.sumArray(counts)
            console.log("suuuuuuuuuuuuuummmmmmmmmmmmmm")
            console.log(abcd)
         var finalObj = Object.assign({"District Name": y[0]}, counts,{"rowCount": abcd});
         this.userSubTypeResults.push(finalObj)      
      });
      
      console.log(this.userSubTypeResults)
      var arrayKeys= Object.keys(this.userSubTypeResults.reduce(function(result:any, obj:any) {
             return Object.assign(result, obj);
           }, {}))
      arrayKeys.push(arrayKeys.splice(arrayKeys.indexOf("rowCount"), 1)[0]);
           console.log(arrayKeys)   
      arrayKeys.forEach((y:any) =>
       {  
      if(y=="")
      {
        y="Blank";
      }
        this.colsUser.push({"field": y,"header": y,"footer": y,"width": '150px'}); 

        this.columns.push({"dataKey": y,"title": y}) 
      
       });

      var json = JSON.parse(JSON.stringify(this.userSubTypeResults).split('"":').join('"Blank":'));  
      console.log("------------usertype result-----------")
      this.userSubTypeResult=json
      console.log(this.userSubTypeResult)
      const countss = this.userSubTypeResults.reduce((acc:any, obj:any) => {
      const objKeys = arrayKeys.forEach(key => {
          if (obj.hasOwnProperty(key)) {
            acc[key] = (acc[key] || 0) + obj[key];
          }
        });
        return acc;
      }, {}); 
      this.keysss=arrayKeys
      countss['District Name']="Total";
      this.fotterTotal=countss;
       });   
  }
  sumArray( counts:any ) {
    var sum = 0;
    for( var el in counts ) {
      if( counts.hasOwnProperty( el ) ) {
        sum += parseFloat( counts[el] );
      }
    }
    return sum;
  }
  exportPdf() {
    const doc = new jsPDF('p','pt'); 
    autoTable(doc, {
      columns: this.columns,
      body: this.userSubTypeResult,
      didDrawPage: (dataArg) => { 
       doc.text('UserTypeReport', dataArg.settings.margin.left, 10);
      }
  }); 
    doc.save('UserTypeReport.pdf');
  }
  getEventValue($event:any) :string {
    return $event.target.value;
  } 
  
  
}
