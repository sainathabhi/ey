import { CoursetimedrilldownService } from './coursetimedrilldown.service';
import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import {FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
@Component({
  selector: 'app-coursetimedrilldown',
  templateUrl: './coursetimedrilldown.component.html',
  styleUrls: ['./coursetimedrilldown.component.scss']
})
export class CoursetimedrilldownComponent implements OnInit {
  myForm:any;
  allJsonFileData : any = new Array()
  yearResuleArray: any = new Array()
  monthResuleArray: any = new Array()
  totalAggregateDataYear: any = new Array()
  totalAggregateDataMonth: any = new Array()
  yearWiseEnrolmentCountArray: any = new Array()
  yearWiseComplitionCountArray: any = new Array()
  yearWiseCertificateIssuedArray: any = new Array()
  yearWiseName: any = new Array()
  onChartClickYearData: any = new Array()
  monthWiseEnrolmentCountArray: any = new Array()
  monthWiseComplitionCountArray: any = new Array()
  monthWiseCertificateIssuedArray: any = new Array()
  monthWiseName: any = new Array()
  yearWiseReportGraph: any ;
  monthWiseReportGraph: any ;
 
  constructor(private http: CoursetimedrilldownService) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      'fromDate': new FormControl((new Date()).toISOString().substring(0,10)),
      'toDate': new FormControl((new Date()).toISOString().substring(0,10)),
    });
    this.dashboardReport();
   
  }
  onSubmit(){
    console.log(this.myForm.value);
  }

dashboardReport()
  {   
    this.http.getData()
    .subscribe((data:any) => {
      console.log(data);
      this.allJsonFileData=data;
      
      for (let i = 0; i < data.length; i++) {
        if(data[i]['Enrolment Date']!=null){
          var stringDate1=data[i]['Enrolment Date'];
           }
          var splitDate1 = stringDate1.split('/');
          var year1 = splitDate1[2];
         // const date = new Date(year1, month1-1, day1);  // 2009-11-10
      //    debugger
         // const month = new Date(date.setMonth(date.getMonth() - 1));
        //  const month = date.toLocaleString('default', { month: 'long' });
          //console.log(month);
        data[i] = Object.assign(data[i], {"year": year1});
      }

var groupByYear = function(xs:any, key:any) {
  return xs.reduce(function(rv:any, x:any) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
 var groubedByYearData=groupByYear(data, 'year')
this.yearResuleArray = Object.entries(groubedByYearData)
console.log(this.yearResuleArray)

this.yearResuleArray.forEach((y:any) =>
{
 
 
    var totalEnrolement =  y[1].reduce(function(n:any, val:any) {
    return n + (val['Enrolment Date'] != '');
    }, 0);

    var totalComplition =  y[1].reduce(function(n:any, val:any) {
      return n + (val['Progress'] == 100);
      }, 0);

      var totalCertificateIssued =  y[1].reduce(function(n:any, val:any) {
        return n + (val['Certificate Status'] =='Issued');
        }, 0);

    var finalObj = Object.assign({"userType": y[0]}, {"enrolmentCount": totalEnrolement},{"complitionCount": totalComplition},{"totalCertificateIssued": totalCertificateIssued});
    this.totalAggregateDataYear.push(finalObj)

   // this.initializeColumns();
    //this.totalEnrolementArray.push(totalEnrolement);
});

this.totalAggregateDataYear.forEach((y:any) =>
{ 
  this.yearWiseEnrolmentCountArray.push(y['enrolmentCount']);
  this.yearWiseComplitionCountArray.push(y['complitionCount']);
  this.yearWiseCertificateIssuedArray.push(y['totalCertificateIssued']);
  this.yearWiseName.push(y['userType']);
});
console.log(this.totalAggregateDataYear)
this.showYearWiseAggregateDataGraph();
    });
  
  }

  closeModal(id:any)
  {
    var formElement = <HTMLFormElement>document.getElementById(id);
      formElement.style.display='none';
  }

  showYearWiseAggregateDataGraph()
{

   this.yearWiseReportGraph = {
    title: {
      left: 'center',
      text: ' Year Wise iGOT Report',
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
    
 
      data: this.yearWiseName
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
      
        data: this.yearWiseEnrolmentCountArray
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
       
        data: this.yearWiseComplitionCountArray
      },
      {
        name: 'Certificate Issued',
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
      
        data: this.yearWiseCertificateIssuedArray
      }
    ],
   
  };
}
onChartClick(e:any)
{
  console.log(e.name);
  this.onChartClickYearData=[];
  this.monthResuleArray=[];
  this.monthWiseEnrolmentCountArray=[];
  this.monthWiseComplitionCountArray=[];
  this.monthWiseCertificateIssuedArray=[];
  this.monthWiseName=[];

  console.log(this.yearResuleArray)
  this.yearResuleArray.forEach((y:any) =>
{
 
if(y[0]==e.name)
{
  this.onChartClickYearData.push(y[1]);
}

});

console.log(this.onChartClickYearData)

for (let i = 0; i < this.onChartClickYearData[0].length; i++) {
  if(this.onChartClickYearData[0][i]['Enrolment Date']!=null){
    var stringDate1=this.onChartClickYearData[0][i]['Enrolment Date'];
     }
    var splitDate1 = stringDate1.split('/');
    var day1  = splitDate1[0];
    var month1 = splitDate1[1];
    var year1 = splitDate1[2];
    const date = new Date(year1, month1-1, day1);  // 2009-11-10
    const month = date.toLocaleString('default', { month: 'long' });
    this.onChartClickYearData[0][i] = Object.assign(this.onChartClickYearData[0][i], {"month": month});
}

var groupByMonth = function(xs:any, key:any) {
return xs.reduce(function(rv:any, x:any) {
(rv[x[key]] = rv[x[key]] || []).push(x);
return rv;
}, {});
};
var groubedByMonthData=groupByMonth(this.onChartClickYearData[0], 'month')
this.monthResuleArray = Object.entries(groubedByMonthData)
console.log(this.monthResuleArray)
this.monthResuleArray.forEach((y:any) =>
{
    var totalEnrolement =  y[1].reduce(function(n:any, val:any) {
    return n + (val['Enrolment Date'] != '');
    }, 0);

    var totalComplition =  y[1].reduce(function(n:any, val:any) {
      return n + (val['Progress'] == 100);
      }, 0);

      var totalCertificateIssued =  y[1].reduce(function(n:any, val:any) {
        return n + (val['Certificate Status'] =='Issued');
        }, 0);

    var finalObj = Object.assign({"userType": y[0]}, {"enrolmentCount": totalEnrolement},{"complitionCount": totalComplition},{"totalCertificateIssued": totalCertificateIssued});
    this.totalAggregateDataMonth.push(finalObj)
});

this.totalAggregateDataMonth.forEach((y:any) =>
{ 
  this.monthWiseEnrolmentCountArray.push(y['enrolmentCount']);
  this.monthWiseComplitionCountArray.push(y['complitionCount']);
  this.monthWiseCertificateIssuedArray.push(y['totalCertificateIssued']);
  this.monthWiseName.push(y['userType']);
});
console.log(this.totalAggregateDataMonth)
this.showMonthWiseAggregateDataGraph();
}
showMonthWiseAggregateDataGraph()
{

   this.monthWiseReportGraph = {
    title: {
      left: 'center',
      text: 'Month Wise iGOT Report',
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
    
 
      data: this.monthWiseName
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
      
        data: this.monthWiseEnrolmentCountArray
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
       
        data: this.monthWiseComplitionCountArray
      },
      {
        name: 'Certificate Issued',
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
      
        data: this.monthWiseCertificateIssuedArray
      }
    ],
   
  };
}
}
