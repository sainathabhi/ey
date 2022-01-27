import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DatePipe} from '@angular/common';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {MultiSelectModule} from 'primeng/multiselect';
import { ReportoneComponent } from './reports/reportone/reportone.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { BatchreportComponent } from './reports/batchreport/batchreport.component';
import { CsvfilereadService } from './reports/reportone/csvfileread.service';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProonereportComponent } from './reports/proonereport/proonereport.component';
import { Ng2GoogleChartsModule, GoogleChartsSettings } from 'ng2-google-charts';
import { CategoryreportComponent } from './reports/categoryreport/categoryreport.component';
import { SeccategoryreportComponent } from './reports/seccategoryreport/seccategoryreport.component';
import { ThirdcategoryreportComponent } from './reports/thirdcategoryreport/thirdcategoryreport.component';
import { MapdrilldownreportComponent } from './reports/mapdrilldownreport/mapdrilldownreport.component';
import { CoursetimedrilldownComponent } from './reports/coursetimedrilldown/coursetimedrilldown.component';
import { CalendarModule } from "primeng/calendar";

@NgModule({
  declarations: [
    ReportoneComponent,
    BatchreportComponent,
    ProonereportComponent,
    CategoryreportComponent,
    SeccategoryreportComponent,
    ThirdcategoryreportComponent,
    MapdrilldownreportComponent,
    CoursetimedrilldownComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    MultiSelectModule,
    Ng2GoogleChartsModule,
    ReactiveFormsModule,
    TableModule,
    CalendarModule,
    AvatarModule,
    DialogModule,
    
   // ButtonModule,
    AvatarGroupModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [
    DatePipe,
    CsvfilereadService
  ]
})
export class DashboardModule { }
