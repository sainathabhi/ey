import { SeccategoryreportService } from './seccategoryreport.service';
import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"
import { Series } from 'highcharts';
@Component({
  selector: 'app-seccategoryreport',
  templateUrl: './seccategoryreport.component.html',
  styleUrls: ['./seccategoryreport.component.scss']
})
export class SeccategoryreportComponent implements OnInit {
  SecSummeryResult: any = new Array()
  totalGroupByUserTypeResultArray: any = new Array()
  totalEnrolementArray: any = new Array()
  colsUsers:any
  categoryReportGraph: any;


  complitionCountArray: any = new Array()
  enrolmentCountArray: any = new Array()
  profesionArray: any = new Array()
  totalCountArray: any = new Array()
  userTypeArray: any = new Array()
  totalOtherEnrolement: any;
  totalOtherComplition: any = new Array()
  SecSummeryResults: any = new Array()
  totalEnrolementForTableArray: any = new Array()
  totalEnrolementForSecandGraphArray: any = new Array()
  secandGraphenrolmentCountArray: any = new Array()
  secandGraphuserTypeArray: any = new Array()
  showSecandUserTypeGraph: any;
 // sales: any = new Array()
  columns:any
  constructor(private service:SeccategoryreportService) { }

  ngOnInit(): void {
    this.secSummeryData();

  this.columns = [
    { title: "Profession Name", dataKey: "userType" },
    { title: " ", dataKey: "profesion" },
    { title: "Enrolment Count", dataKey: "enrolmentCount" },
    { title: "Completion Count", dataKey: "complitionCount" },
    { title: "Total Count", dataKey: "totalCount" }
  ];

  }
 closeModal(id:any)
{
  var formElement = <HTMLFormElement>document.getElementById(id);
    formElement.style.display='none';
}
secSummeryData()
{
  this.service.getData().subscribe((res)=>{
    console.log(res)
    this.SecSummeryResult=res;


    this.SecSummeryResult.forEach(function(item:any) {
      if( (item['User Sub Type']!="Lab Technician") && (item['User Sub Type']!="Nurses") && (item['User Sub Type']!="Doctor (Allopathy)") && (item['User Sub Type']!="Pharmacist") &&
      (item['User Sub Type']!="Other Health Worker") && (item['User Sub Type']!="ANMs") && (item['User Sub Type']!="ASHA Health worker") &&
       (item['User Sub Type']!="Dentist & Dental Students") && (item['User Sub Type']!="Psychosocial HealthProf") &&
        (item['User Sub Type']!="Sanitation Prof.") && (item['User Sub Type']!="RWA representative") && (item['User Sub Type']!="Student/ Intern")
        && (item['User Sub Type']!="Police") && (item['User Sub Type']!="District Administrator") && (item['User Sub Type']!="AYUSH Professional")
        && (item['User Sub Type']!="Allied & Healthcare Professional") && (item['User Sub Type']!="Rehabilitation Prof.") && (item['User Sub Type']!="NCC Cadets") && (item['User Sub Type']!="NSS Volunteers")
        && (item['User Sub Type']!="Other Volunteer") && (item['User Sub Type']!="Common citizen") && (item['User Sub Type']!="NYKS Volunteers") && (item['User Sub Type']!="NGO Volunteer")
        && (item['User Sub Type']!="Volunteer BSG") && (item['User Sub Type']!="")) {
          item['User Sub Type'] = 'OtherCandidate';
      }
      else if(item['User Sub Type']=="")
      {
        item['User Sub Type'] = 'blank'
      }
    });



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
          if( (y[0]=="OtherCandidate") || (y[0]=="blank"))
          {
           var Profession="Volunteer";
           var totalEnrolement1 =  y[1].reduce(function(n:any, val:any) {
            return n + (val['Enrolment Date'] != '');
            }, 0);
            var finalObj1 = Object.assign({"userType": y[0]}, {"enrolmentCount": totalEnrolement1},{"profesion": Profession});
            this.totalEnrolementForSecandGraphArray.push(finalObj1)

          }
          else if((y[0]!="OtherCandidate") && (y[0]!="blank")){
            var Profession="Health";

            var totalEnrolement2 =  y[1].reduce(function(n:any, val:any) {
            return n + (val['Enrolment Date'] != '');
            }, 0);

            var totalComplition2 =  y[1].reduce(function(n:any, val:any) {
              return n + (val['Progress'] == 100);
              }, 0);
              var totalNonComplition2=  y[1].reduce(function(n:any, val:any) {
                return n + (val['Completion Date'] == '');
                }, 0);

            //var totalCount =totalEnrolement+totalComplition;
            var finalObj = Object.assign({"userType": y[0]}, {"enrolmentCount": totalEnrolement2},{"complitionCount": totalComplition2},{"OnGoing": totalNonComplition2},{"profesion": Profession});
            this.totalEnrolementArray.push(finalObj)

          }




            //this.totalEnrolementArray.push(totalEnrolement);
     });
console.log("fffffffffffffffffffff")
console.log(this.totalEnrolementForSecandGraphArray)
console.log("ssssssssssssssssssss")
console.log(this.totalEnrolementArray)
console.log("ttttttttttttttttttt")


this.totalEnrolementForTableArray=this.totalEnrolementArray.concat(this.totalEnrolementForSecandGraphArray);

console.log(this.totalEnrolementForTableArray)
this.initializeColumns();

     //for first graph show array------------------
     this.totalEnrolementArray.slice(0,2);
     console.log(this.totalEnrolementArray )
     //this.totalEnrolementArray.splice(0,1);
     console.log(this.totalEnrolementArray)
     this.totalEnrolementArray.forEach((y:any) =>
     {
     this.complitionCountArray.push(y['complitionCount']);
     this.enrolmentCountArray.push(y['enrolmentCount']);
   // this.profesionArray.push(y['profesion']);
     this.totalCountArray.push(y['OnGoing']);
     this.userTypeArray.push(y['userType']);
     });

     this.totalEnrolementForSecandGraphArray.forEach((y:any) =>
     {
     this.secandGraphenrolmentCountArray.push({"value": y['enrolmentCount'],"name":y['userType']});


     });
    this.showCategoryReportGraph();


    });
}

initializeColumns() {
  this.colsUsers = [
    { field: 'userType', header: 'Profession Name', width: '150px' },
    { field: 'profesion', header: '', width: '150px' },
    { field: 'enrolmentCount', header: 'Enrolment Count', width: '150px' },
    { field: 'complitionCount', header: 'Completion Count', width: '150px' },
    { field: 'OnGoing', header: 'On Going', width: '150px' },
  ]
}
showCategoryReportGraph()
{

   this.categoryReportGraph = {
    title: {
      show:false,
      left: 'center',
      text: 'iGOT REPORT',
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


      data: this.userTypeArray
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
        label: {
         // show: true
        },
        color:'#9d77a6',
        emphasis: {
          focus: 'series',

        },

        data: this.enrolmentCountArray
      },
      {
        name: 'Completion Count',
        type: 'bar',
        stack: 'total',
        label: {
         // show: true
        },
        color:"#7ace7e",

        data: this.complitionCountArray
      },
    ],


  };
  this.showSecandGrap();
}
showSecandGrap()
{
  this.showSecandUserTypeGraph = {
    title: {
      show:false,
      text: 'Referer of a Website',
      subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    toolbox: {
      show: true,
      orient: 'vertical',
    //  left: 'right',
      itemGap: 25,
      top: '3%',
      itemSize: "20",
      right: "1.5%",
      feature: {
        myTool1: {
          show: true,
          title :  'About The Graph Info...' ,
        //   emphasis:{
        //     iconStyle: {
        //         borderColor: "blue",

        //     },
        // },

          icon: 'image://assets/imgs/background/infoo.png',
          onclick: function (){
              alert('myToolHandler1')
          }
      },
      myTool :  { //Custom tool myTool
        show :  true ,
        title :  'Full screen display' ,
        icon :  'image://assets/imgs/background/zoom-inn.png' , //this The string "image://" must be added in front of the picture path
        onclick :  function  ( ) {
          debugger
            //Generate full screen display chart
            var formElement = <HTMLFormElement>document.getElementById('myModal4');
            formElement.style.display='block';
        }
    } ,
        // mark: { show: true, },
        dataView: { show: true, iconStyle: {
          borderColor: "#06167F"
      }, readOnly: false },
        // magicType: { show: true,iconStyle: {
        //   borderColor:"#DE3163"

        // }, type: ['line', 'bar'] },
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
              formatter: function (param:any) {
                  return '<div>' + param.title + '</div>'; // user-defined DOM structure
              },
              backgroundColor: '#222',
              textStyle: {
                  fontSize: 12,
                  color:'white',
              },
              extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);' // user-defined CSS styles
          }
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: this.secandGraphenrolmentCountArray,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };


}
getEventValue($event:any) :string {
  return $event.target.value;
}
exportPdf() {
  const doc = new jsPDF('p','pt');
  autoTable(doc, {
    columns: this.columns,
    body: this.totalEnrolementArray,
    didDrawPage: (dataArg) => {
     doc.text('Category Wise Report', dataArg.settings.margin.left, 10);
    }
});
  doc.save('CategoryWiseReport.pdf');
}
}
