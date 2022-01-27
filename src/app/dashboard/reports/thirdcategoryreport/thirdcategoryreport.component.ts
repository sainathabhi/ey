import { ThirdcategoryreportService } from './thirdcategoryreport.service';
import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"
@Component({
  selector: 'app-thirdcategoryreport',
  templateUrl: './thirdcategoryreport.component.html',
  styleUrls: ['./thirdcategoryreport.component.scss']
})
export class ThirdcategoryreportComponent implements OnInit {
  totalComplCount: any;
  totalHealthAndVolunCount: any;
  fotterTrainTotal: any;
  [x: string]: any;
  SecSummeryResult: any = new Array()
  totalGroupByUserTypeResultArray: any = new Array()
  totalEnrolementArray: any = new Array()
  colsUsers:any
  traningReportGraph: any;
  graphComplitionCountArray: any = new Array()
  graphEnrolmentCountArray: any = new Array()
  graphTotalCountArray: any = new Array()
  graphUserTypeArray: any = new Array()
  complitionCountArray: any = new Array()
  enrolmentCountArray: any = new Array()
  profesionArray: any = new Array()
  totalCountArray: any = new Array()
  userTypeArray: any = new Array()
  footerKeys: any = new Array()
  totalVolunteer:any
 // sales: any = new Array()
  columns:any
  totalVolunteerIncomplitionCount: any;
  totalVolunteerInEnrolmentCount: any;
  totalHealthIncomplitionCount: any;
  totalHealthInEnrolmentCount: any;
  totalHealth: any;
  totalEnrolCount: any;
  constructor(private service:ThirdcategoryreportService) { }

  ngOnInit(): void {
   // this.batchServiceCall();
    this.secSummeryData();
    this.initializeColumnsForPdf();
  }

secSummeryData()
{
  this.service.getData().subscribe((res)=>{
    this.SecSummeryResult=res;
        var groupByUserType = function(xs:any, key:any) {
        return xs.reduce(function(rv:any, x:any) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
          }, {});
        };
        var totalGroupByUserType=groupByUserType(this.SecSummeryResult, 'User Sub Type')
        this.totalGroupByUserTypeResultArray = Object.entries(totalGroupByUserType) 
        console.log(this.totalGroupByUserTypeResultArray)
         this.totalGroupByUserTypeResultArray.forEach((y:any) =>
        {
          if((y[0]=="dsert_director") || (y[0]=="Lab Technician") || (y[0]=="Nurses") || (y[0]=="Doctor (Allopathy)") || (y[0]=="Pharmacist") || (y[0]=="Other Health Worker") || (y[0]=="ANMs") || (y[0]=="ASHA Health worker") || (y[0]=="Dentist & Dental Students") || (y[0]=="diet_pricipal") || (y[0]=="diet_principal") || (y[0]=="diet_lecturer") || (y[0]=="Psychosocial HealthProf"))
          {
           var Profession="Health";
          } 
         else 
         {
          var Profession="Volunteer";
         }
        
            var totalEnrolement =  y[1].reduce(function(n:any, val:any) {
            return n + (val['Enrolment Date'] != '');
            }, 0);

            var totalComplition =  y[1].reduce(function(n:any, val:any) {
              return n + (val['Progress'] == 100);
              }, 0);

            var totalCount =totalEnrolement+totalComplition;
            var finalObj = Object.assign({"userType": y[0]}, {"enrolmentCount": totalEnrolement},{"complitionCount": totalComplition},{"totalCount": totalCount},{"profesion": Profession});
            this.totalEnrolementArray.push(finalObj)

           
            //this.totalEnrolementArray.push(totalEnrolement);
     });

     console.log(this.totalEnrolementArray)
     this.totalEnrolementArray.forEach((y:any) =>
     {   
     this.complitionCountArray.push(y['complitionCount']);
     this.enrolmentCountArray.push(y['enrolmentCount']);
     this.totalCountArray.push(y['totalCount']);
     this.userTypeArray.push(y['userType']);
     });
   
     this.totalVolunteerIncomplitionCount = this.totalEnrolementArray.filter((profesionType:any) => profesionType['profesion']=="Volunteer").map((bill:any) =>
      bill['complitionCount']).reduce((acc:any, bill:any) => 
      bill + acc);


     this.totalVolunteerInEnrolmentCount = this.totalEnrolementArray.filter((profesionType:any) => profesionType['profesion']=="Volunteer").map((bill:any) =>
      bill['enrolmentCount']).reduce((acc:any, bill:any) => 
      bill + acc);

     this.totalVolunteer=this.totalVolunteerIncomplitionCount+this.totalVolunteerInEnrolmentCount;

     console.log(this.totalVolunteer)

     this.totalHealthIncomplitionCount = this.totalEnrolementArray.filter((profesionType:any) => profesionType['profesion']=="Health").map((bill:any) =>
      bill['complitionCount']).reduce((acc:any, bill:any) => 
      bill + acc);


     this.totalHealthInEnrolmentCount = this.totalEnrolementArray.filter((profesionType:any) => profesionType['profesion']=="Health").map((bill:any) =>
      bill['enrolmentCount']).reduce((acc:any, bill:any) => 
      bill + acc);

     this.totalHealth=this.totalHealthIncomplitionCount+this.totalHealthInEnrolmentCount;
     console.log(this.totalHealth)
    //  this.totalEnrolCount=this.totalVolunteerInEnrolmentCount+this.totalHealthInEnrolmentCount;
    //  this.totalComplCount=this.totalVolunteerIncomplitionCount+this.totalHealthIncomplitionCount;
    //  this.totalHealthAndVolunCount=this.totalVolunteer+this.totalHealth

    var finalGraphObj = Object.assign({"userType": "Healthcare"}, {"graphEnrolmentCount": this.totalHealthInEnrolmentCount},{"graphComplitionCount": this.totalHealthIncomplitionCount},{"totalCount": this.totalHealth});
     this.profesionArray.push(finalGraphObj);
     var finalGraphObj1 = Object.assign({"userType": "Volunteers"}, {"graphEnrolmentCount": this.totalVolunteerInEnrolmentCount},{"graphComplitionCount": this.totalVolunteerIncomplitionCount},{"totalCount": this.totalVolunteer});
     this.profesionArray.push(finalGraphObj1);
     console.log(this.profesionArray)
     this.initializeColumns();
     this.profesionArray.forEach((y:any) =>
     {   
     this.graphComplitionCountArray.push(y['graphComplitionCount']);
     this.graphEnrolmentCountArray.push(y['graphEnrolmentCount']);
     this.graphTotalCountArray.push(y['totalCount']);
     this.graphUserTypeArray.push(y['userType']);
     });
     var arrayKeys= Object.keys(this.profesionArray.reduce(function(result:any, obj:any) {
      return Object.assign(result, obj);
    }, {}))  
    console.log(arrayKeys);


    const countss = this.profesionArray.reduce((acc:any, obj:any) => {
      const objKeys = arrayKeys.forEach(key => {
          if (obj.hasOwnProperty(key)) {
            acc[key] = (acc[key] || 0) + obj[key];
          }
        });
        return acc;
      }, {}); 
      this.footerKeys=arrayKeys
      console.log(countss)
     countss["userType"]="Total";
      this.fotterTrainTotal=countss;
console.log(this.fotterTrainTotal);

this.showTrainingReportGraph();

    });
   
   

  }
  closeModal(id:any)
  {
    var formElement = <HTMLFormElement>document.getElementById(id);
      formElement.style.display='none';
  }

  showTrainingReportGraph()
{

   this.traningReportGraph = {
    title: {
      left: 'center',
      text: 'USER TYPE REPORT',
      triggerEvent: true,
      
    },
   
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'line' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    
    toolbox: {
      show: true,
      orient: 'vertical',
    //  left: 'right',
      itemGap: 25,
      top: '3%',
      itemSize: "20",
      right: "0.8%",
      feature: {
        myTool1: {
          show: true,
         
          title: 'About The Graph Info...About The Graph Infoss...' ,
        //   emphasis:{
        //     iconStyle: {
        //         borderColor: "blue",
               
        //     },
        // },
        
          icon: 'image://assets/imgs/background/infoo.png',
          onclick: function (){
           //   alert('myToolHandler1')
          }
      },
      myTool :  { //Custom tool myTool 
        show :  true , 
        title :  'Full screen display' , 
        icon :  'image://assets/imgs/background/zoom-inn.png' , //this The string "image://" must be added in front of the picture path 
        onclick :  function  ( ) {
          debugger 
            //Generate full screen display chart 
            var formElement = <HTMLFormElement>document.getElementById('myModal');
            formElement.style.display='block';
        } 
    } ,
        mark: { show: true, },
        dataView: { show: true, iconStyle: {
          borderColor: "#06167F"
      }, readOnly: false },
        magicType: { show: true,iconStyle: {
          borderColor:"#DE3163"
            
        }, type: ['line', 'bar', 'stack'] },
        restore: { show: true,iconStyle: {
          borderColor: "#FF8F00"
      }, },
        saveAsImage: { show: true, iconStyle: {
          borderColor: "green"
      }, }
      },
      showTitle: false,
      tooltip: { // same as option.tooltip
        show: true,
        backgroundColor: '#222',
        textStyle: {
          fontSize: 12,
          color:'white',
      },
      extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
        formatter: function (param:any) {	
          if (param.name=='myTool1')
          return '<div style="margin-right:242px;">' + param.title + '</div>';
          else
          return '<div style="margin-right:52px;">' + param.title + '</div>';

         
        },
    }
    },
    legend: {
      top: '7%',
     // orient: 'vertical',
     // left:2 ,
    },
    xAxis: {
      nameLocation: "middle",
      grid: { containLabel: true },
      axisLabel: {
        interval:0,
        rotate: 50,
    },
   
  
      data: this.graphUserTypeArray
    },
    yAxis: {
      type: 'value',
      axisLine:{                 //Coordinate axis
        show:true,             //Show Axis axis or not
        onZero:true,           //Whether the axis of X-axis or Y-axis is on the 0 scale of another axis is valid only when the other axis is a numerical axis and contains the 0 scale
    },
    },
    series: [
      
      {
        name: 'Enrolment Count',
        type: 'bar',
        stack: 'total',
        barCategoryGap: '30%',
           
           label: {
             //   show: true,
                //rotate: 28,
                
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#bc52d9' },
                { offset: 0.5, color: '#9728b6' },
                { offset: 1, color: '#7c2195' }
              ])
            },
            emphasis: {
              focus: 'series',
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#7c2195' },
                  { offset: 0.7, color: '#9728b6' },
                  { offset: 1, color: '#bc52d9' }
                ])
              }
            },
        data: this.graphEnrolmentCountArray
      },
      {
        name: 'Complition Count',
        type: 'bar',
        stack: 'total',
        label: {
         // show: true
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#30cb30' },
            { offset: 0.5, color: '#29ab29' },
            { offset: 1, color: '#218b21' }
          ])
        },
        emphasis: {
          focus: 'series',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#218b21' },
              { offset: 0.7, color: '#29ab29' },
              { offset: 1, color: '#30cb30' }
            ])
          }
        },
        data: this.graphComplitionCountArray
      },
      {
        name: 'Total Count',
        type: 'bar',
        stack: 'total',
        label: {
         // show: true
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#ffb14e' },
            { offset: 0.5, color: '#ff9814' },
            { offset: 1, color: '#d87900' }
          ])
        },
        emphasis: {
          focus: 'series',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#d87900' },
              { offset: 0.7, color: '#ff9814' },
              { offset: 1, color: '#ffb14e' }
            ])
          }
        },
        data: this.graphTotalCountArray
      }
    ],
   
  };
  
}
initializeColumns() {
  this.colsUsers = [
    { field: 'userType', header: 'Category', width: '150px' },
    { field: 'graphEnrolmentCount', header: 'Enrolement Count', width: '150px' },
    { field: 'graphComplitionCount', header: 'Completion Count', width: '150px' },
    { field: 'totalCount', header: 'Total Count', width: '150px' },  
  ]
}
initializeColumnsForPdf()
{
  this.columns = [
    { title: "Category", dataKey: "userType" },
    { title: "Enrolement Count", dataKey: "graphEnrolmentCount" },
    { title: "Completion Count", dataKey: "graphComplitionCount" },
    { title: "Completion Count", dataKey: "totalCount" },
    { title: "Total Count", dataKey: "totalCount" }
  ];
}
getEventValue($event:any) :string {
  return $event.target.value;
} 
exportPdf() {
  const doc = new jsPDF('p','pt'); 
  autoTable(doc, {
    columns: this.columns,
    body: this.profesionArray,
    didDrawPage: (dataArg) => { 
     doc.text('User Type Report', dataArg.settings.margin.left, 10);
    }
}); 
  doc.save('UserTypeReport.pdf');
}

}
