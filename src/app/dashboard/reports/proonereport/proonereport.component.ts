import { Component, OnInit } from '@angular/core';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"
import { ProonereportService } from './proonereport.service';
@Component({
  selector: 'app-proonereport',
  templateUrl: './proonereport.component.html',
  styleUrls: ['./proonereport.component.scss']
})
export class ProonereportComponent implements OnInit {
  summeryResult: any = new Array()
  allCourseWiseData: any = new Array()
  colsUserss: any 
  columns: any;
  constructor(private serv:ProonereportService) { }

  ngOnInit(): void {
   this.summeryData();
  this.initializeColumnsForPdf();
  }
  summeryData()
  {
    this.serv.getData().subscribe((res)=>{
       console.log(res)
         this.allCourseWiseData=res;
         debugger
         this.allCourseWiseData.forEach((y:any) =>
    { 
     // this.totalDistrictNameCompletion=y[0]
     let onGoingCount=y['Participant Count']-y['Completion Count'];
     this.summeryResult.push({"Batch Name": y['Batch Name'],"Participant Count": y['Participant Count'],"Completion Count": y['Completion Count'],"Certificate Count":y['Certificate Count'],"onGoingCount":onGoingCount})
    });
         

    this.initializeColumns();

       },
      
      
     );
     console.log(this.summeryResult)
  }
  initializeColumns() {
    this.colsUserss = [
      { field: 'Batch Name', header: 'Course Name', width: '150px' },
      { field: 'Participant Count', header: 'Participant Count', width: '150px' },
      { field: 'Completion Count', header: 'Completion Count', width: '150px' },
      { field: 'onGoingCount', header: 'OnGoing Count', width: '150px' },  
      { field: 'Certificate Count', header: 'Certificate Count', width: '150px' },
    ]
  }
  initializeColumnsForPdf()
{
  this.columns = [
    { title: "Course Name", dataKey: "Batch Name" },
    { title: "Participant Count", dataKey: "Participant Count" },
    { title: "Completion Count", dataKey: "Completion Count" },
    { title: "OnGoing Count", dataKey: "onGoingCount" },
    { title: "Certificate Count", dataKey: "Certificate Count" }
  ];
}
  getEventValue($event:any) :string {
    return $event.target.value;
  } 
  exportPdf() {



    const doc = new jsPDF('p','pt'); 
    autoTable(doc, {
      columns: this.columns,
      body: this.summeryResult,
      margin: { horizontal: 10 },
      styles: { overflow: "linebreak" },
      theme: "striped",
      showHead: "everyPage",
      didDrawPage: (dataArg) => { 
      doc.text('Course Wise Summery', dataArg.settings.margin.left, 10);
      }
  }); 
    doc.save('CourseWiseSummery.pdf');
  }
}