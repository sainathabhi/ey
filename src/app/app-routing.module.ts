import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{ path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
{
  path: '',
  component: HomeComponent,
  children: [
    { path: '', component: HomeComponent },
    // {
    //   path: 'about-us',
    //   component: AboutUsComponent,
    // },
    // {
    //   path: 'contact-us',
    //   component: ContactUsComponent,
    // },
    // {
    //   path: 'welcome',
    //   component: WelcomeComponent,
    // },
    
  ],
  // canActivate: [PublicauthGuard]
},];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
