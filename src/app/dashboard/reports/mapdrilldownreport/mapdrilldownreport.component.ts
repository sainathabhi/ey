import { MapdrilldownreportService } from './mapdrilldownreport.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as echarts from 'echarts';

@Component({
  selector: 'app-mapdrilldownreport',
  templateUrl: './mapdrilldownreport.component.html',
  styleUrls: ['./mapdrilldownreport.component.scss']
})
export class MapdrilldownreportComponent implements OnInit {
  stateName: any;
  allJsonData : any = new Array()
  groupBytotalBatchArray: any = new Array()
  batchName: any = new Array()
  totalRegistrationInBatches: any = new Array()
  showBatchesWiseCountRegistrationGraph:any
  constructor(private http: MapdrilldownreportService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.stateName = this.route.snapshot.queryParamMap.get("stateName");
    console.log(this.stateName)
    this.batchesInState();
  }
batchesInState()
{
  this.groupBytotalBatchArray=[];
  this.batchName=[];
  this.totalRegistrationInBatches=[];
  this.http.getData()
  .subscribe((data:any) => {
    console.log(data);
    this.allJsonData=data;
    var groupByBatchs = function(xs:any, key:any) {
      return xs.reduce(function(rv:any, x:any) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };
    var totalBatch=groupByBatchs(this.allJsonData, 'State')
    this.groupBytotalBatchArray = Object.entries(totalBatch)
    console.log(this.groupBytotalBatchArray);
  this.groupBytotalBatchArray.forEach((y:any) =>
  {
    this.batchName.push(y[0]);
    this.totalRegistrationInBatches.push(y[1].length);
  });
  this.showBatchesWiseCountGraph();
  });

}
showBatchesWiseCountGraph()
{
  this.showBatchesWiseCountRegistrationGraph = {

    title: {
      text: 'REGISTRATION IN BATCHES'+' ('+this.stateName+')',
    // text: 'REGISTRATION IN BATCHES ',
     left: 'center',      //Main title
 },

tooltip: {
      trigger: 'axis'
    },
    toolbox: {
     show: true,
     orient: 'vertical',
   //  left: 'right',
     itemGap: 25,
     top: '3%',
     itemSize: "20",
     right: "1%",
     feature: {
       myTool1: {
         show: true,

         title :  'About The Graph Info...' ,
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

       }, type: ['line', 'bar'] },
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
xAxis: {
 type: 'category',
 data: this.batchName,
 grid: { containLabel: true },
 axisLabel: {
   interval: 0,
   rotate: 45 //If the label names are too long you can manage this by rotating the label.
 }
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
   data: this.totalRegistrationInBatches,
   type: 'bar',
   itemStyle: {
     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
       { offset: 0, color: '#bc52d9' },
       { offset: 0.5, color: '#9728b6' },
       { offset: 1, color: '#7c2195' }
     ])
   },
   emphasis: {
     itemStyle: {
       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
         { offset: 0, color: '#7c2195' },
         { offset: 0.7, color: '#9728b6' },
         { offset: 1, color: '#bc52d9' }
       ])
     }
   },
 }
]
};
}
closeModal(id:any)
  {
    var formElement = <HTMLFormElement>document.getElementById(id);
      formElement.style.display='none';
  }

}
