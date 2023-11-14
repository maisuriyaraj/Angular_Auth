import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicHomeComponent } from './components/public-home/public-home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { PrivateDashboardComponent } from './components/private-dashboard/private-dashboard.component';
import { authGuard } from './Guard/auth.guard';

const routes: Routes = [
  {path:"",component:PublicHomeComponent},
  {path:"signup",component:SignupComponent},
  {path:"login",component:LoginComponent},
  {path:"dashboard",component:PrivateDashboardComponent,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
