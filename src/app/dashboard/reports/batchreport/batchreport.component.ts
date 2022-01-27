import { Component, OnInit} from '@angular/core';
import { BatchreportService } from './batchreport.service';
import * as echarts from 'echarts';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"
import * as _ from 'lodash-es';
@Component({
  selector: 'app-batchreport',
  templateUrl: './batchreport.component.html',
  styleUrls: ['./batchreport.component.scss']
})
export class BatchreportComponent implements OnInit {
  allCsvData: any = new Array()
  totalBatchesCountInBatchReport: any = new Array()
  totalUniqueParticipentInBatches: any = new Array()
  totalParticipantsSateWiseArray: any = new Array()
  participantsSateName: any = new Array()
  participantsInState: any = new Array()
  compliteparticipant: any = new Array()
  searchStateDataArray: any = new Array()
  totalcomResultArray:any
  totalCompData: any = new Array()
  totalCompFullData: any = new Array()
  nonCompliteparticipant: any = new Array()
  participantsInStateCount: any = new Array()
  nonCompliteDistrictparticipant: any = new Array()
  totalNoncomResultArray: any = new Array()
  totalNonCompData: any = new Array()
  totalNoncomFullData: any = new Array()
  DistrictWiseParticipenatGraph:any
  colsUser: any
  totalDistrictNonCompletionDataLength: any = new Array()
  totalDistrictCompletionArray: any = new Array()
  totalDistrictNonCompletionArray: any = new Array()
  participantsInDistrictCount: any = new Array()
  compliteDistrictparticipant: any = new Array()
 // totalDistrictNameCompletion: any = new Array()
  totalDistrictCompletionData: any = new Array()
  totalDeclaredBoardCount: any = new Array()
  totalentriesDeclaredBoardDataArray: any = new Array()
  participantsDistrictName: any = new Array()
  totalDeclaredBoardCountData: any = new Array()
  totalDistrictWiseParticipentArray: any = new Array()
  totalDistrictNonCompletionData: any = new Array()
  totalDistrictCompletionDataLength: any = new Array()
  allCsvDataForSearchDeclaredBoard: any = new Array()
  participantsInDistrict: any = new Array()
  totalIgotHealthData: any = new Array()
  totalDeclaredBoardName: any = new Array()
  stateWiseParticipentAndNonParticipentGraph: any = new Array()
  districtWiseParticipentAndNonParticipentGraph:any
  stateWiseParticipenatGraph:any
  declaredBoardGraph:any
  allStateNameData: any = new Array()
  totalDeclaredBoardArray: any = new Array()
  allCsvDataForDeclaredBoard: any = new Array()
  searchDeclaredBoardArray: any = new Array()
  stateWiseParticipantData: any = new Array()
  districtWiseParticipantData: any = new Array()
  //total: any = new Array()
  stateDeclairedBoardGraph:any
  totalDeclaireStateName: any = new Array()

 totalDeclaireStateCount: any = new Array()
 totalDeclaireStateLengh: any = new Array()
 totalBatchIdGraphArray: any = new Array()
 totalBatchesFromBothReport: any = new Array()
 totalOtherBatchesArray: any = new Array()
 abcd: any = new Array()
 totalUniqueParticipent:any
  selectAdresseAllUsers: boolean = false;
  showDelaireBoardStateDiv: boolean = false;
  //DeclaredBoardGraphModal: boolean = false;
  changeDivColor: boolean = false;
  changeDivColor1: boolean = false;
  showTotalParticipentDiv: boolean = true;
  showOtherBatchesDiv: boolean = false;
  showTotalBatchesDiv: boolean = false;
  selectAdresseAllUsers1: boolean = false;
  selectAdresseAllUsers2: boolean = false;
  stateTableShow: boolean = false;
  districtTableShow: boolean = false;
  colsUserDistrict: any;
  Statecolumns:any
  Districtcolumns:any
  colsOtherBatchs:any
 // stateWiseParticipenatModal: boolean = false;
 // stateWiseParticipentAndNonParticipentModal: boolean = false;
  //districtWiseParticipenatModal: boolean = false;
 // districtWiseParticipentAndNonParticipentModal= false;
  //dt: any;
  constructor(private http:BatchreportService) { }

  ngOnInit(): void {
    this.readbatchReportCsv();
    this.initializeColumns();
    this.initializeDistrictColumns();
    this.batchServiceCall();
    this.initializeOtherBatchColumns();
    //this.declaredBoardData();
  }


  batchServiceCall()
  {

    this.http.batchData().subscribe((res)=>{
      console.log("hhhhhhhhhhhhhhhhhheeeeeeeeeeeeeeelllllllloooo")
  this.abcd=res;
  console.log(this.abcd['result']['response']['content'])
    });
  }




readbatchReportCsv()
{
  //this.allCsvDataForSearchDeclaredBoard=[];
  //this.allCsvDataForDeclaredBoard=[];
  this.allCsvData=[];
  this.http.getBatchReportData()
  .subscribe((data:any) => {
    this.allCsvData=data
    console.log("--All Csv Batch Report Data---")
    console.log(this.allCsvData)




    //-------------Total Batches------------------------------
    var groupByBatchReport = function(xs:any, key:any) {
      return xs.reduce(function(rv:any, x:any) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };
    var totalBatchData=groupByBatchReport(this.allCsvData, 'Batch Name')
    this.totalBatchesCountInBatchReport = _.keys(totalBatchData).length;
   // console.log(this.totalBatchesCountInBatchReport)
    //------------end here------------------------------------------

    var groupByBatchIdReport = function(xs:any, key:any) {
      return xs.reduce(function(rv:any, x:any) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };
    var totalBatchIdData=groupByBatchIdReport(this.allCsvData, 'Batch Id')
    var totalBatchIdArray = Object.entries(totalBatchIdData)
    console.log(totalBatchIdArray)

         totalBatchIdArray.forEach((y:any) =>
          {
        var splitId = y[0].split('_');
        var finalObj1 = Object.assign({"batchId": splitId[1]});
        this.totalBatchIdGraphArray.push(finalObj1)
        //this.totalEnrolementArray.push(totalEnrolement);
    });
var result = this.abcd['result']['response']['content'].filter((f:any) =>
  !this.totalBatchIdGraphArray.some((d:any) => d.batchId == f.batchId)
);


var groupByBatchIdFilterReport = function(xs:any, key:any) {
  return xs.reduce(function(rv:any, x:any) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
var totalBatchIdFilterData=groupByBatchIdFilterReport(result, 'batchId')
console.log(totalBatchIdFilterData)
console.log("batch id dataaaaaaaaaaaaaaaaaa")
this.totalBatchesFromBothReport = _.keys(totalBatchIdFilterData).length;
var totalBatchFilterIdArray = Object.entries(totalBatchIdFilterData)
totalBatchFilterIdArray.forEach((y:any) =>
{
var finalObj1 = Object.assign({"batchId": y[0]}, {"name": y[1][0]['name']},{"startDate": y[1][0]['startDate']},{"endDate": y[1][0]['endDate']});
this.totalOtherBatchesArray.push(finalObj1)
//this.totalEnrolementArray.push(totalEnrolement);
});


console.log(this.totalOtherBatchesArray)

   // -----------Total Unique Participent in batches-------------
    var UniqueParticipentInBatches=function(value:any, index:any, self:any) {
    return self.indexOf(value) === index;
    }
    var uniqueValue = this.allCsvData.filter(UniqueParticipentInBatches);
    this.totalUniqueParticipentInBatches=uniqueValue.length.toLocaleString();

    this.totalUniqueParticipent = _.uniqBy(this.allCsvData, 'User UUID').length.toLocaleString();
    console.log('uniqueNamesCount',  this.totalUniqueParticipent);
  //-----------end here-------------------------------------------



// this.totalDeclaredBoardArray.forEach((y:any) =>
// {
//   if(y[0]=='iGOT-Health' || y[0]=='IGOT-Health' )
//  {
//  this.totalIgotHealthData.push(y[1]);
//  }
//  //this.total.push(this.totalIgotHealthData)
// });
// var merged  = this.totalIgotHealthData[0].concat(this.totalIgotHealthData[1]);
 //var merged = _.combine(this.totalIgotHealthData[0], this.totalIgotHealthData[1]);
// debugger
// this.totalIgotHealthData.forEach((y:any) =>
// {
//   this.total.push(y[0])
//   this.total.push(y[1])
// });

// merged.forEach((y:any) =>
// {

// this.totalDeclaredBoardArray.push({"label": y})

// });
// console.log(this.totalDeclaredBoardArray)
//-----------------End Here-----------------------------------------


    this.stateParticipetionData();

  })
}

stateParticipetionData()
{
  this.stateTableShow=true;
  this.districtTableShow=false;
  //-----------State Wise Particepent-------------------------------
this.totalParticipantsSateWiseArray=[];
var groupByStateParticipantData = function(xs:any, key:any) {
  return xs.reduce(function(rv:any, x:any) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
var totalParticipantsSateWise=groupByStateParticipantData(this.allCsvData, 'State')
console.log(totalParticipantsSateWise)
console.log("---total participent group by  state-------------")
this.totalParticipantsSateWiseArray = Object.entries(totalParticipantsSateWise)
console.log(this.totalParticipantsSateWiseArray)
this.participantsSateName=[];
this.participantsInState=[];
this.participantsInStateCount=[];
this.compliteparticipant=[];
this.nonCompliteparticipant=[];
  this.totalParticipantsSateWiseArray.forEach((y:any) =>
  {
this.participantsSateName.push(y[0]);
this.allStateNameData.push({"label": y[0],"value":y[0]})
this.participantsInState=y[1];
this.participantsInStateCount.push(this.participantsInState.length);
      var list = this.participantsInState.filter((x:any) => x['Completion Date']!='');
      list.forEach((x:any) => {
        this.compliteparticipant.push(x);
      })
      var list1 = this.participantsInState.filter((xx:any) => xx['Completion Date']=='');
      list1.forEach((xx:any) => {
        this.nonCompliteparticipant.push(xx);
      })
      var list3 = this.participantsInState.filter((xy:any) => xy['Certificate Status']=='Issued');
      var finalObj = Object.assign({"StateName":y[0]},{"participantsInState":this.participantsInState.length}, {"CompletionCount": list.length},{"CertificateCount": list3.length});
      this.stateWiseParticipantData.push(finalObj)


});

console.log("state wise data summery")
console.log(this.stateWiseParticipantData)
this.showStateParticipantsGraph();
}
showStateParticipantsGraph()
{
  this.stateWiseParticipenatGraph = {

         title: {
          show: false,
          text: 'STATE WISE PARTICIPANTS',
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
      data: this.participantsSateName,
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
        data: this.participantsInStateCount,
        type: 'bar',
        color:'#9d77a6',
      }
    ]
  };

this.complitionAndNonComplitionData();
}
closeModal(id:any)
{
  var formElement = <HTMLFormElement>document.getElementById(id);
    formElement.style.display='none';
}
complitionAndNonComplitionData()
{
  var groupByCom = function(xs:any, key:any) {
    return xs.reduce(function(rv:any, x:any) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
  var totalcom=groupByCom(this.compliteparticipant, 'State')
  this.totalcomResultArray = Object.entries(totalcom)
  this.totalcomResultArray.forEach((y:any) =>
  {
  this.totalCompData=y[1]
  this.totalCompFullData.push(this.totalCompData.length);
  });

  var groupByNonCom = function(xs:any, key:any) {
    return xs.reduce(function(rv:any, x:any) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
  var totalNoncom=groupByNonCom(this.nonCompliteparticipant, 'State')
  this.totalNoncomResultArray = Object.entries(totalNoncom)
  console.log(this.totalcomResultArray)
  this.totalNoncomResultArray.forEach((y:any) =>
    {
     this.totalNonCompData=y[1]
     this.totalNoncomFullData.push(this.totalNonCompData.length);
    });


this.showStateWiseCompliteNonCompliteGraph()
}
showStateWiseCompliteNonCompliteGraph()
{

  console.log(this.participantsSateName)
console.log(this.totalCompFullData);
console.log(this.totalNoncomFullData);
this.selectAdresseAllUsers=true;
   this.stateWiseParticipentAndNonParticipentGraph = {

    title: {
      show:false,
      text: 'STATE WISE COMPLETED Vs ONGOING',
      left: 'center',      //Main title

  },

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'line' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },

    legend: {
      top: '7%',
     // orient: 'vertical',
     // left:2 ,
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
        title :  'About The Graph Info...About The Graph Info...Graph<br>About The Graph Info...' ,
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
          var formElement = <HTMLFormElement>document.getElementById('myModal1');
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
    xAxis: {
      nameLocation: "middle",
      grid: { containLabel: true },
      axisLabel: {
        interval:0,
        rotate: 50,
    },

  ticks: {
      display:true,
      stepSize: 0,
      min: 0,
      autoSkip: false,
      fontSize: 11,
      padding: 12
  },
      data: this.participantsSateName
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
          name: 'On Going',
          type: 'bar',
          stack: 'total',
          label: {
           // show: true
          },
          color:'#ffb14e',

          data: this.totalNoncomFullData
        },
        {
          name: 'Completion Count',
          type: 'bar',
          stack: 'total',
          label: {
           // show: true
          },
          color:"#7ace7e",

          data: this.totalCompFullData
        },
      ],



  };
}
clickOtherBatches(){
this.showTotalParticipentDiv=false;
this.showOtherBatchesDiv=true;
}
onChartClick(e:any)
{
  console.log(e);
  this.stateTableShow=false;
  this.districtTableShow=true;
  this.searchStateDataArray=[];
  this.compliteDistrictparticipant=[];
  this.nonCompliteDistrictparticipant=[];
  this.totalDistrictCompletionArray=[];
 // this.totalDistrictNameCompletion=[];
  this.totalDistrictCompletionData=[];
  this.totalDistrictCompletionDataLength=[];
  this.participantsDistrictName=[];
  this.participantsInDistrict=[];
  this.participantsInDistrictCount=[];
  this.districtWiseParticipantData=[];
  this.totalParticipantsSateWiseArray.forEach((y:any) =>
  {
      if(y[0]==e.name)
      {
        this.searchStateDataArray.push(y[1]);
      }
});
 console.log(this.searchStateDataArray)
 var groupByDistrictData = function(xs:any, key:any) {
  return xs.reduce(function(rv:any, x:any) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
var totalParticipantsDistrictWise=groupByDistrictData(this.searchStateDataArray[0], 'District')

console.log(totalParticipantsDistrictWise);

this.totalDistrictWiseParticipentArray = Object.entries(totalParticipantsDistrictWise)

this.totalDistrictWiseParticipentArray.forEach((y:any) =>
  {
this.participantsDistrictName.push(y[0]);
this.participantsInDistrict=y[1]
this.participantsInDistrictCount.push(this.participantsInDistrict.length);
      var list = this.participantsInDistrict.filter((x:any) => x['Completion Date']!='');
      list.forEach((x:any) => {
        this.compliteDistrictparticipant.push(x);
      })
      var list1 = this.participantsInDistrict.filter((xx:any) => xx['Completion Date']=='');
      list1.forEach((xx:any) => {
        this.nonCompliteDistrictparticipant.push(xx);
      })

      var list3 = this.participantsInDistrict.filter((xy:any) => xy['Certificate Status']=='Issued');
      var finalObj = Object.assign({"StateName":e.name},{"DistrictName":y[0]},{"participantsInDistrict":this.participantsInDistrict.length}, {"CompletionCount": list.length},{"CertificateCount": list3.length});
      this.districtWiseParticipantData.push(finalObj)
});
console.log("district wise data summery")

console.log(this.districtWiseParticipantData)
this.showDistrictParticipentGraph(e.name)
}

showDistrictParticipentGraph(stateName:any)
{
  this.selectAdresseAllUsers1=true;
  this.DistrictWiseParticipenatGraph = {
         title: {
          show: false,
          text: 'DISTRICT WISE PARTICIPANTS'+' ('+stateName+')',
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
      type: 'category',
      data: this.participantsDistrictName,
      grid: { containLabel: true },
      axisLabel: {
        interval: 0,
        rotate: 40 //If the label names are too long you can manage this by rotating the label.
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
        data: this.participantsInDistrictCount,
        type: 'bar',
        color:'#9d77a6',
      }
    ]
  };
  this.showDistrictWiseCopliteAndNonCompliteGraph(stateName);
}

showDistrictWiseCopliteAndNonCompliteGraph(stateName:any)
{

var groupByDistrictCom = function(xs:any, key:any) {
  return xs.reduce(function(rv:any, x:any) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
var totalDistrictcom=groupByDistrictCom(this.compliteDistrictparticipant, 'District')
console.log(totalDistrictcom);

    var groupByDistrictNonCom = function(xs:any, key:any) {
      return xs.reduce(function(rv:any, x:any) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };
    var totalDistrictNoncom=groupByDistrictNonCom(this.nonCompliteDistrictparticipant, 'District')
    console.log(totalDistrictNoncom);

this.totalDistrictCompletionArray = Object.entries(totalDistrictcom)
  this.totalDistrictCompletionArray.forEach((y:any) =>
    {
     // this.totalDistrictNameCompletion=y[0]
     this.totalDistrictCompletionData=y[1]
     this.totalDistrictCompletionDataLength.push(this.totalDistrictCompletionData.length);
    });

console.log( this.totalDistrictCompletionDataLength)

    this.totalDistrictNonCompletionArray = Object.entries(totalDistrictNoncom)
    console.log(this.totalDistrictNonCompletionArray);
      this.totalDistrictNonCompletionArray.forEach((y:any) =>
        {
          //this.totalDistrictNameCompletion=y[0]
         this.totalDistrictNonCompletionData=y[1]
         this.totalDistrictNonCompletionDataLength.push(this.totalDistrictNonCompletionData.length);
        });

        console.log(this.totalDistrictNonCompletionDataLength)

        this.showDistrictWiseCompliteAndNonCompliteGraph(stateName);
}
showDistrictWiseCompliteAndNonCompliteGraph(stateName:any)
{
  this.selectAdresseAllUsers2=true;
   this.districtWiseParticipentAndNonParticipentGraph = {
    title: {
      show:false,
      text: 'DISTRICT WISE COMPLETED Vs ONGOING'+' ('+stateName+')',
      left: 'center',      //Main title
  },

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'line' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    legend: {
      top: '7%',
     // orient: 'vertical',
     // left:2 ,
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
          var formElement = <HTMLFormElement>document.getElementById('myModal3');
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
    xAxis: {
      nameLocation: "middle",
      grid: { containLabel: true },
      axisLabel: {
        interval:0,
        rotate: 28,
    },


      data: this.participantsDistrictName
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
        name: 'On Going',
        type: 'bar',
        stack: 'total',
        label: {
         // show: true
        },
        color:'#ffb14e',

        data: this.totalDistrictNonCompletionDataLength
      },
      {
        name: 'Completion Count',
        type: 'bar',
        stack: 'total',
        label: {
         // show: true
        },
        color:"#7ace7e",

        data: this.totalDistrictCompletionDataLength
      },
    ],

  };
}
getEventValue($event:any) :string {
  return $event.target.value;
}
// showStateWiseParticipenatModal() {
//   this.stateWiseParticipenatModal = true;
// }
// showStateWiseParticipentAndNonParticipentModal() {
//   this.stateWiseParticipentAndNonParticipentModal = true;
// }
// showDistrictWiseParticipenatModal()
// {
//   this.districtWiseParticipenatModal = true;
// }
// showDistrictWiseParticipenatAndNonParticipentModal()
// {
//   this.districtWiseParticipentAndNonParticipentModal = true;
// }
clickParticipentDiv()
{
  this.changeDivColor1=true;
  this.changeDivColor=false;
  this.showTotalBatchesDiv=false;
  this.showTotalParticipentDiv=true;
  this.showOtherBatchesDiv=false
}

initializeColumns() {
  this.colsUser = [
    { field: 'StateName', header: 'State', width: '150px' },
    { field: 'participantsInState', header: 'Participants Count', width: '150px' },
    { field: 'CompletionCount', header: 'Complition Count', width: '150px' },
    { field: 'CertificateCount', header: 'Certificate Issued Count', width: '150px' },

  ]
  this.Statecolumns = [
    { title: "State", dataKey: "StateName" },
    { title: "Participants Count", dataKey: "participantsInState" },
    { title: "Complition Count", dataKey: "CompletionCount" },
    { title: "Certificate Issued Count", dataKey: "CertificateCount" }
  ];
}

initializeOtherBatchColumns()
{
  this.colsOtherBatchs = [
    { field: 'batchId', header: 'Batch Id', width: '150px' },
    { field: 'name', header: 'Batch Name', width: '150px' },
    { field: 'startDate', header: 'Start Date', width: '150px' },
    { field: 'endDate', header: 'End Date', width: '150px' },

  ]
}

initializeDistrictColumns() {
  this.colsUserDistrict = [
    { field: 'StateName', header: 'State', width: '150px' },
    { field: 'DistrictName', header: 'District', width: '150px' },
    { field: 'participantsInDistrict', header: 'Participants Count', width: '150px' },
    { field: 'CompletionCount', header: 'Complition Count', width: '150px' },
    { field: 'CertificateCount', header: 'Certificate Issued Count', width: '150px' },

  ]
  this.Districtcolumns = [
    { title: "State", dataKey: "StateName" },
    { title: "District", dataKey: "DistrictName" },
    { title: "Participants Count", dataKey: "participantsInState" },
    { title: "Complition Count", dataKey: "CompletionCount" },
    { title: "Certificate Issued Count", dataKey: "CertificateCount" }
  ];
}

declaredBoardData()
{
  this.changeDivColor=true;
  this.changeDivColor1=false;
  this.showTotalParticipentDiv=false;
  this.showTotalBatchesDiv=true;
  this.allCsvDataForDeclaredBoard=[];
  this.allCsvDataForSearchDeclaredBoard=[];
  this.http.getBatchReportData()
  .subscribe((data:any) => {

    this.allCsvDataForDeclaredBoard=data;
    this.allCsvDataForSearchDeclaredBoard=data;

//----------------------Total Declared Board-----------------------
this.totalDeclaredBoardArray=[];
this.totalDeclaredBoardName=[];
this.totalDeclaredBoardCount=[];
this.totalDeclaredBoardCountData=[];

for(var key in this.allCsvDataForDeclaredBoard){
  if(this.allCsvDataForDeclaredBoard[key]['Declared Board'])
  {
  if ((this.allCsvDataForDeclaredBoard[key]['Declared Board']).match(/iGOT-Health/)){
    this.allCsvDataForDeclaredBoard[key]['Declared Board'] = "IGOT-Health";
  }
}

}

for(var key in this.allCsvDataForDeclaredBoard){
  if(this.allCsvDataForDeclaredBoard[key]['Declared Board'])
  {
  if ((this.allCsvDataForDeclaredBoard[key]['Declared Board']).match(/State/)){
    this.allCsvDataForDeclaredBoard[key]['Declared Board'] = "State";
  }
}

}




var groupByDeclaredBoardaa = function(xs:any, key:any) {
  return xs.reduce(function(rv:any, x:any) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
var totalDeclaredBoardData=groupByDeclaredBoardaa(this.allCsvDataForDeclaredBoard, 'Declared Board')
console.log(totalDeclaredBoardData);

 this.totalDeclaredBoardArray = Object.entries(totalDeclaredBoardData)


this.totalDeclaredBoardArray.forEach((y:any) =>
{
 this.totalDeclaredBoardName=y[0]
 this.totalDeclaredBoardCount=y[1]
 this.totalDeclaredBoardCountData.push({"value": this.totalDeclaredBoardCount.length,"name":this.totalDeclaredBoardName})

});
console.log("total declaired board data--------------------------")
 console.log(this.totalDeclaredBoardCountData)
 this.showDeclaredBoardGraph();
  });
}

showDeclaredBoardGraph(){

  this.declaredBoardGraph =  {
    title: {
      text: 'BOARD WISE BATCH',
      left: 'center',      //Main title
  },
    tooltip: {
      trigger: 'item',

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

    },
    legend: {
      top: '7%',
     orient: 'vertical',
     left:'2%',
     width: "0%",
     type:"scroll",
     itemGap: 15,
    //  itemHeight: 7,
    //  z:1,
    //  itemWidth: 11.5
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: this.totalDeclaredBoardCountData,
      }
    ]
  };

}
onDeclaredBoardChartClick(e:any)
{
console.log(e);

this.searchDeclaredBoardArray=[];
debugger
for(var key in this.allCsvData){
  if(this.allCsvData[key]['Declared Board']!=null)
  {
  if ((this.allCsvData[key]['Declared Board']).match(/State/)){
    //this.allCsvDataForDeclaredBoard[key]['Declared Board'] = "IGOT-Health";

   this.searchDeclaredBoardArray.push(this.allCsvData[key]);
  }
  }
}
console.log(this.searchDeclaredBoardArray)

var groupByDeclaredBoard = function(xs:any, key:any) {
  return xs.reduce(function(rv:any, x:any) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
var totalDeclaredBoardDataArray=groupByDeclaredBoard(this.searchDeclaredBoardArray, 'Declared Board')
this.totalentriesDeclaredBoardDataArray = Object.entries(totalDeclaredBoardDataArray)
console.log(this.totalentriesDeclaredBoardDataArray)
this.totalDeclaireStateName=[];
this.totalDeclaireStateCount=[];
this.totalDeclaireStateLengh=[];
this.totalentriesDeclaredBoardDataArray.forEach((y:any) =>
{
  this.totalDeclaireStateName.push(y[0])
 this.totalDeclaireStateCount=y[1]
 this.totalDeclaireStateLengh.push(this.totalDeclaireStateCount.length);
});
this.showDelaireBoardState();
}
showDelaireBoardState()
{
  this.showDelaireBoardStateDiv=true;
  console.log(this.totalDeclaireStateName)
  console.log(this.totalDeclaireStateLengh)
  this.stateDeclairedBoardGraph = {
         title: {
          text: 'STATE BOARD WISE BATCH',
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
          right: "0.5%",
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
                var formElement = <HTMLFormElement>document.getElementById('myModal5');
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

        },
    xAxis: {
      type: 'category',
      data: this.totalDeclaireStateName,
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
        data: this.totalDeclaireStateLengh,
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
stateWiseexportPdf() {
  const doc = new jsPDF('p','pt');
  autoTable(doc, {
    columns: this.Statecolumns,
    body: this.stateWiseParticipantData,
    didDrawPage: (dataArg) => {
     doc.text('State Wise Report', dataArg.settings.margin.left, 10);
    }
});
  doc.save('StateWiseReport.pdf');
}
districtWiseexportPdf() {
  const doc = new jsPDF('p','pt');
  autoTable(doc, {
    columns: this.Districtcolumns,
    body: this.districtWiseParticipantData,
    didDrawPage: (dataArg) => {
     doc.text('District Wise Report', dataArg.settings.margin.left, 10);
    }
});
  doc.save('DistrictWiseReport.pdf');
}

}
