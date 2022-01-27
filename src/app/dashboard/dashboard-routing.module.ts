import { CoursetimedrilldownComponent } from './reports/coursetimedrilldown/coursetimedrilldown.component';
import { MapdrilldownreportComponent } from './reports/mapdrilldownreport/mapdrilldownreport.component';
import { ThirdcategoryreportComponent } from './reports/thirdcategoryreport/thirdcategoryreport.component';
import { SeccategoryreportComponent } from './reports/seccategoryreport/seccategoryreport.component';
import { CategoryreportComponent } from './reports/categoryreport/categoryreport.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportoneComponent } from './reports/reportone/reportone.component';
import { BatchreportComponent } from './reports/batchreport/batchreport.component';
import { ProonereportComponent } from './reports/proonereport/proonereport.component';

const routes: Routes = [
  {
    path: '', component: ReportoneComponent, 
  },
  {
    path: 'batch', component: BatchreportComponent,
  },
  {
    path: 'CoursesDrillDown', component: CoursetimedrilldownComponent,
  },
  {
    path: 'ProfesionalReport', component: ProonereportComponent,
  },
  {
    path: 'CategoryReport', component: CategoryreportComponent,
  },
  {
    path: 'SecCategoryReport', component: SeccategoryreportComponent,
  },
  {
    path: 'ThirdCategoryReport', component: ThirdcategoryreportComponent,
  },
  {
    path: 'MapDrillDown', component: MapdrilldownreportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
