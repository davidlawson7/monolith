import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { DashboardPageComponent, LoginPageComponent } from '@features';
import { AuthGuardService } from '@elmdex/core';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [AuthGuardService],
  },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
