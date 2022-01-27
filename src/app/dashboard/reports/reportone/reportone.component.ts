import { Component, Output, EventEmitter } from '@angular/core';
import * as echarts from 'echarts';
import { GoogleChartInterface } from 'ng2-google-charts';
import { ChartSelectEvent } from 'ng2-google-charts';
import * as _ from 'lodash-es';
import { DatePipe } from '@angular/common'
import { CsvfilereadService } from './csvfileread.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reportone',
  templateUrl: './reportone.component.html',
  styleUrls: ['./reportone.component.scss']
})
export class ReportoneComponent {
  states_data = [['State','completion(%)','Enrolement']];
  Component1Variable:string="Component1VariableSent";
  allCsvData: any = new Array()
  dStartDate: any;
  enrolmentDate: any = new Array()
  dateWiseCertificateIssuedArray: any = new Array()
  enrolementdateEmp: any;
  dateWiseDataFromMainCsv: any;
  enrolmentDateEmpCount: any = new Array()
  allEnrolementDateArray: any = new Array()
  enrollmentDateChart: any = new Array()
  EnrolmentDateResultArray: any = new Array()
  groubedByDateWiseCertificateIssuedArray: any = new Array()
  totalBatchesCount: any = new Array()
  mapReady=false;
  enrolmentCertificateDate: any = new Array()
  complinceCertificateIssuedResultArray: any = new Array()
  enrolementCertificateDateEmp: any = new Array()
  EnrolmentCertificateIssuedResultArray: any = new Array()
  enrolmentCertificateDateEmpCount: any = new Array()
  completionDatadArray: any = new Array()
  complinceCertificateDate: any = new Array()
  complinceCertificateDateEmp: any = new Array()
  totalStateWiseParticipentData: any = new Array()
  complinceCertificateDateEmpCount: any = new Array()
  Pre_states_data:any = new Array()
  totalStateSummeryArray:any = new Array()
  dateWiseEnrolementChart:any
  enrolementCertificateChart:any
  complinceCertificateChart:any
  totalUniqueParticipent:any
  totalCompletion:any
  totalDateWiseCompletion:any
  totalCertificateIssued:any
  lastday: any;
  lastSevenDay: any;
  latest_date:any;
  latest_seven_date:any
  colsUsers:any
  SVC: any;
  totalParticipent: any;
  range: any;
  constructor( private http: CsvfilereadService,public datepipe: DatePipe,private _router: Router) { }
  ngOnInit() {
    this.lastday='seven';
    this.readFullCsv();


  }

  public readFullCsv(){
    this.http.getData()
      .subscribe((data:any) => {
        console.log(data);
        this.allCsvData=data;
        console.log("--merge file all data---")
        console.log(data);
        console.log(this.allCsvData)
// ----------- Total Batches In Json Start Here-----------------------------
        var groupByBatch = function(xs:any, key:any) {
          return xs.reduce(function(rv:any, x:any) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
          }, {});
        };
        var totalBatch=groupByBatch(this.allCsvData, 'Batch Name')
        this.totalBatchesCount = _.keys(totalBatch).length.toLocaleString();
//---------- Total Batches In Json End Here-------------------------

//-------Total Participent Statr Here------------
        // var  UniqueParticipent=function(value:any, index:any, self:any) {
        // return self.indexOf(value) === index;
        // }
        //var uniqueValue = this.allCsvData.filter(UniqueParticipent);
        this.totalParticipent=this.allCsvData.length.toLocaleString();

        this.totalUniqueParticipent = _.uniqBy(this.allCsvData, 'User UUID').length.toLocaleString();
        console.log('uniqueNamesCount',  this.totalUniqueParticipent);
// Total Participent End Here-------------------

//-------Total Completion Statr Here----------------------------------------------
        this.totalCompletion =  this.allCsvData.reduce(function(n:any, val:any) {
        return n + (val.Progress == 100);
        }, 0);
        this.totalCompletion=this.totalCompletion.toLocaleString()
//---------------Total Completion End Here---------------------------------------------

//-------Total Certificate Issue Here--------------------------------------------------
        this.totalCertificateIssued =  this.allCsvData.reduce(function(n:any, val:any) {
        return n + (val['Certificate Status'] == 'Issued');
        }, 0);
        this.totalCertificateIssued=this.totalCertificateIssued.toLocaleString()

//---------------Total Certificate Issue End Here----------------------------------


var groupByStateParticipantsData = function(xs:any, key:any) {
  return xs.reduce(function(rv:any, x:any) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
var totalParticipantSateWise=groupByStateParticipantsData(this.allCsvData, 'State')
this.totalStateWiseParticipentData = Object.entries(totalParticipantSateWise)





console.log(this.totalStateWiseParticipentData)
this.totalStateWiseParticipentData.forEach((y:any) =>
    {
     // this.totalDistrictNameCompletion=y[0]
     if(y[0]!='')
     {
     var totalEnrolement =  y[1].reduce(function(n:any, val:any) {
       return n + (val['Enrolment Date'] != '');
       }, 0);
       var totalComplition =  y[1].reduce(function(n:any, val:any) {
         return n + (val['Progress'] == 100);
         }, 0);

         var percent =Math.floor((totalComplition*100)/totalEnrolement);
         if(percent<=60)
         {
           this.range=60;
         }
         else if(percent<=70 && percent>=60 )
         {
           this.range=70;
         }
         else if(percent<=80 && percent>=70 )
         {
           this.range=80;
         }
         else if(percent<=100 && percent>=80 )
         {
           this.range=100;
         }

    // this.totalDistrictNameCompletion=y[0]
    this.Pre_states_data.push({"state": y[0],"Percent":percent,"Enrolement":totalEnrolement})
       }
    });
    console.log("mappppppppppppppppppppppppppp")
    console.log(this.Pre_states_data)
    //this.Pre_states_data.splice(0,1);

    for(let state of this.Pre_states_data){
      let temp = [state.state,Number(state.Percent),Number(state.Enrolement)];

      if( state.state=="Andaman & Nicobar Islands"){
        temp = ['IN-AN',Number(state.Percent),state.Enrolement];
      }
      else if( state.state=="Lakshadweep"){
        temp = ['IN-LD',Number(state.Percent),state.Enrolement];
      }
      else if( state.state=="Uttarakhand"){
        temp = ['IN-UT',Number(state.Percent),state.Enrolement];
      }
      else if( state.state=="Odisha"){
        temp = ['IN-OR',Number(state.Percent),state.Enrolement];
      }
      this.states_data.push(temp);
    }
     this.mapReady=true
    console.log(this.states_data)
    console.log("---total participent group by  state-------------")


       this.datecalculation(this.lastday)

      })

  }


  datecalculation(lastday:any){
    let dte = new Date();
    var sdate = dte.setDate(dte.getDate() - 1);
    this.latest_date =this.datepipe.transform(sdate, 'MM/dd/yyyy');

    if(lastday=='seven')
    {
      this.lastSevenDay=true;

     var sevendate = dte.setDate(dte.getDate() - 8);
    this.latest_seven_date =this.datepipe.transform(sevendate, 'MM/dd/yyyy');
    }
    else if(lastday=='fiftin')
    {
      var sevendate = dte.setDate(dte.getDate() - 16);
      this.latest_seven_date =this.datepipe.transform(sevendate, 'MM/dd/yyyy');
    }
    else if(lastday=='thiirty')
    {
      var sevendate = dte.setDate(dte.getDate() - 31);
      this.latest_seven_date =this.datepipe.transform(sevendate, 'MM/dd/yyyy');
    }


    this.allEnrolementDateArray = this.allCsvData.filter((obj:any) => Object.keys(obj).includes("Enrolment Date"));
    var realColors = this.allEnrolementDateArray.filter(function (e:any) {return e['Enrolment Date'] != null;});
    console.log(realColors)
    console.log("oooooooooutpuutt")
console.log(this.allEnrolementDateArray)
    var startDate = new Date(this.latest_seven_date);
    var endDate = new Date(this.latest_date);
    this.dateWiseDataFromMainCsv='';
    this.dateWiseDataFromMainCsv = realColors.filter((a:any) => {
      if(a['Enrolment Date']!=null){
     var stringDate1=a['Enrolment Date'];
      }
     var splitDate1 = stringDate1.split('/');
     var day1  = splitDate1[0];
     var month1 = splitDate1[1];
     var year1 = splitDate1[2];
     this.dStartDate = month1+"/"+day1+"/"+year1;
     var date = new Date(this.dStartDate);
      return (date >= startDate && date <= endDate);
    });
    this.enrolementGrapg();

  }



  closeModal(id:any)
  {
    var formElement = <HTMLFormElement>document.getElementById(id);
      formElement.style.display='none';
  }

  enrolementGrapg()
  {
//-------------------Enrolement Date Wise Bar Graph Chart---------------------------
console.log("ennnnnnnnnnnrolllllllllllllllll")
 console.log(this.dateWiseDataFromMainCsv);
 this.EnrolmentDateResultArray='';
 this.enrolmentDate=[];
 this.enrolementdateEmp=[];
 this.enrolmentDateEmpCount=[];
var groupByEnrolementDate = function(xs:any, key:any) {
  return xs.reduce(function(rv:any, x:any) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
var groubedByEnrolmentDateResult=groupByEnrolementDate(this.dateWiseDataFromMainCsv, 'Enrolment Date')
this.EnrolmentDateResultArray = Object.entries(groubedByEnrolmentDateResult)
console.log("--------------Final Enrolement data wise data------------------------")
console.log(this.EnrolmentDateResultArray);
this.EnrolmentDateResultArray.forEach((y:any) =>
  {
this.enrolmentDate.push(y[0]);
this.enrolementdateEmp=y[1]
this.enrolmentDateEmpCount.push(this.enrolementdateEmp.length);
  });
 console.log("----Enrloement Date all Result------------")
 console.log(this.enrolementdateEmp);
 console.log(this.enrolmentDate)
 console.log(this.enrolmentDateEmpCount)
if(this.enrolmentDateEmpCount.length >0)
{
this.showEnrolementGraph(); //show enrolement graph
}

//-----------------------Enrolement Date Wise end here-------------------


  }


  showEnrolementGraph()
  {

    this.dateWiseEnrolementChart = {
      title: {
             show: false,
             left: 'center',
             text: 'COURSE  ENROLMENT STATICS GRAPH  ',
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
               title: 'About The Graph Info About The Graph Info About The Graph Info </br>About The Graph Info About The Graph Info <br>About The Graph Info About The Graph Info...' ,
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
          axisLabel: {
            interval:0,
            rotate: 65,
        },
      xAxis: {
        type: 'category',
        data: this.enrolmentDate
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
          data: this.enrolmentDateEmpCount,
          type: 'line',
          color:'#9d77a6'

        //  color: '#8E24AA'
        }
      ]
    };

    this.enrolementCertificateIssue();
  }


  enrolementCertificateIssue()
  {
    this.groubedByDateWiseCertificateIssuedArray='';
    this.enrolmentCertificateDate=[];
    this.enrolementCertificateDateEmp=[];
    this.enrolmentCertificateDateEmpCount=[];
    this.EnrolmentCertificateIssuedResultArray=[];
   this.dateWiseCertificateIssuedArray=[];
    this.dateWiseDataFromMainCsv.forEach((y:any) =>
    {
      if(y['Certificate Status']=='Issued')
      {
        this.dateWiseCertificateIssuedArray.push(y);
      }
    });
  console.log("date wise certificate-------------------")
    console.log(this.dateWiseCertificateIssuedArray)
var groupByEnrolementDate = function(xs:any, key:any) {
  return xs.reduce(function(rv:any, x:any) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
var groubedByDateWiseCertificateIssuedArray=groupByEnrolementDate(this.dateWiseCertificateIssuedArray, 'Enrolment Date')
console.log("final  data certificateeeeeeeeeeeee")
console.log(groubedByDateWiseCertificateIssuedArray)
this.EnrolmentCertificateIssuedResultArray = Object.entries(groubedByDateWiseCertificateIssuedArray)
this.EnrolmentCertificateIssuedResultArray.forEach((y:any) =>
  {
this.enrolmentCertificateDate.push(y[0]);
this.enrolementCertificateDateEmp=y[1]
this.enrolmentCertificateDateEmpCount.push(this.enrolementCertificateDateEmp.length);
  });

  this.showEnrolementCertificateGraph();
  }
  showEnrolementCertificateGraph()
  {
    this.enrolementCertificateChart = {

      title: {
        show:false,
        left: 'center',
        text: 'COURSE CERTIFICATE ISSUED STATICS GRAPH',
      },

      tooltip: {

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
           title: 'About The Graph Info...About The Graph Info...' ,
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

              //Generate full screen display chart
              var formElement = <HTMLFormElement>document.getElementById('myModal2');
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
       // type: 'category',
       // name: "Category",
        nameLocation: "middle",

        axisLabel: {
          interval:0,
          rotate: 65,
      },

    ticks: {
        display:true,
        stepSize: 0,
        min: 0,
        autoSkip: false,
        fontSize: 11,
        padding: 12
    },
        data:this.enrolmentCertificateDate,
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
          data:  this.enrolmentCertificateDateEmpCount,
          type: 'bar',
          showBackground: true,
          color:"#ffb14e"


        },
      ],
    };
    this.completionCertificateIssue();
  }
  completionCertificateIssue()
  {
    this.completionDatadArray=[];
    this.complinceCertificateDate=[];
    this.complinceCertificateDateEmp=[];
    this.complinceCertificateDateEmpCount=[];
    this.dateWiseDataFromMainCsv.forEach((y:any) =>
    {
      if(y['Certificate Status']=='Issued')
      {
        this.completionDatadArray.push(y);
      }
    });
    console.log("---completion certificate issed data")
    console.log(this.completionDatadArray)
    var groupByComplitionCertificateIssuedDate = function(xs:any, key:any) {
      return xs.reduce(function(rv:any, x:any) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };
    var DateWiseComplitionCertificateIssuedArray=groupByComplitionCertificateIssuedDate(this.completionDatadArray, 'Completion Date')



this.complinceCertificateIssuedResultArray = Object.entries(DateWiseComplitionCertificateIssuedArray)
console.log("-----complition datasssssssssss--------------------")
console.log(this.complinceCertificateIssuedResultArray)
this.complinceCertificateIssuedResultArray.forEach((y:any) =>
  {
this.complinceCertificateDate.push(y[0]);
this.complinceCertificateDateEmp=y[1]
this.complinceCertificateDateEmpCount.push(this.complinceCertificateDateEmp.length);
  });

this.showComplitionCertificateGraph();
  }


  showComplitionCertificateGraph()
  {
    this.complinceCertificateChart = {

      title: {
        show: false,
        left: 'center',
        text: 'COURSE COMPLETION STATICS GRAPH',
      },

      tooltip: {

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
           title: 'about the graph Lorem ipsum dolor sit amet, <br>consectetur adipiscing elit. Quisque nisl eros<br>facilisis justo mollis, auctor consequat urna.<br> Morbi a bibendum metus.<br> Donec scelerisque sollicitudin enim eu venenatis. <br>Duis tincidunt laoreet ex ' ,
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
              //Generate full screen display chart
              var formElement = <HTMLFormElement>document.getElementById('myModal1');
              formElement.style.display='block';
          }
      } ,
          mark: { show: true, },
          dataView: { show: true, iconStyle: {
            borderColor: "#06167F"
        },readOnly: false },
          magicType: { show: true,iconStyle: {
            borderColor:"#DE3163",

          },

          type: ['line', 'bar'] },
          restore: { show: true,iconStyle: {
            borderColor: "#FF8F00"
        }, },
          saveAsImage: { show: true, emphasis:{
            iconStyle: {
                borderColor: "white"
            },
        },iconStyle: {
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

    //   lineStyle: {
    //     color: 'transparent',
    //     width: 12,
    //     type: 'line'
    // },
      xAxis: {
       // type: 'category',
       // name: "Category",
        nameLocation: "middle",

        axisLabel: {
          interval:0,
          rotate: 65,
      },

    ticks: {
        display:true,
        stepSize: 0,
        min: 0,
        autoSkip: false,
        fontSize: 11,
        padding: 12
    },
        data:this.complinceCertificateDate,
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
          data:  this.complinceCertificateDateEmpCount,
          type: 'bar',
          showBackground: true,
          color:'#7ace7e'

        },
      ],
    };
   // this.completionCertificateIssue();



this.showTableDataStateWise();
  }
  showTableDataStateWise()
  {
    this.totalStateWiseParticipentData.forEach((y:any) =>
    {

        var totalEnrolement =  y[1].reduce(function(n:any, val:any) {
        return n + (val['Enrolment Date'] != '');
        }, 0);

        var totalComplition =  y[1].reduce(function(n:any, val:any) {
          return n + (val['Progress'] == 100);
          }, 0);
          var totalNonComplition =  y[1].reduce(function(n:any, val:any) {
            return n + (val['Completion Date'] == '');
            }, 0);
     var percentageOfComplition =Math.floor((totalComplition*100)/totalEnrolement);
      //  var totalCount =totalEnrolement+totalComplition;
        var finalObj = Object.assign({"stateName": y[0]}, {"enrolmentCount": totalEnrolement},{"complitionCount": totalComplition},{"percentage": percentageOfComplition+"%"});
        this.totalStateSummeryArray.push(finalObj)
        console.log("total summery")
        console.log(this.totalStateSummeryArray)

        //this.totalEnrolementArray.push(totalEnrolement);

    });
    this.initializeColumns();
  }
  initializeColumns() {
    this.colsUsers = [
      { field: 'stateName', header: 'State', width: '50px' },
      { field: 'enrolmentCount', header: 'Enrolment', width: '50px' },
      { field: 'complitionCount', header: 'Completion', width: '50px' },
      { field: 'percentage', header: 'Percentage', width: '50px' },
    ]
  }
  getEventValue($event:any) :string {
    return $event.target.value;
  }
  public geoChart: GoogleChartInterface = {
    chartType: 'GeoChart',
    dataTable: this.states_data,

    options: {
      // region: 'IN', // INDIA
      colorAxis: {colors: ['#db1d30', '#ff6a00', '#1FA20F','#156930','#033E3B']},
     // colorAxis: {colors: ['#FF0D0D','#FFBF00','#013220']},
     // colorAxis: {colors: ['#ff6a00','#00cc55']},
      // resolution: 'provinces',
      // backgroundColor: '#FFFFFF',
      // //showLabels: "1",
      // showLabels: "1",
      // useSNameInLabels: "1",
      // datalessRegionColor: '#FFFFFF',
      // defaultColor: '#FFFFFF',
      // enableRegionInteractivity: 'true',
      // keepAspectRatio: true,


        domain:'IN',
        region: 'IN',
        displayMode: 'regions',
     //  colorAxis: {colors: ['#0000FF', '#D6C537','#00C957','#01C5BB','#D43D1A','#FFA500','#DC143C','#FFFF00','#FF6103','#FF00FF','#646F5E','#7A378B','#CD7F32','#B57EDC', '#2E86C1','#1B2631','#40E0D0','#FF7F50','#1B5E20','#00FF00']},
        resolution: 'provinces',
        /*backgroundColor: '#81d4fa',*/
        datalessRegionColor: '#FFFFFF',
        defaultColor: '#f5f5f5',
        // width: 640,
        minHeight: 450,
     maxHeight: 600,
      // 'width':600,
    }
  };
  public select(event: ChartSelectEvent) {
    this._router.navigate(['dashboard/MapDrillDown'], { queryParams: { stateName: event.selectedRowValues[0]} });

  }
}
