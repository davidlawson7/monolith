import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ManagerHeaderComponent } from './manager-header/manager-header.component';
import { CmiLayoutComponent } from './cmi-layout/cmi-layout.component';
import { UiModule } from '@ui';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  imports: [CommonModule, UiModule],
  declarations: [
    DashboardPageComponent,
    LoginPageComponent,
    SidebarComponent,
    ManagerHeaderComponent,
    CmiLayoutComponent,
  ],
  exports: [
    DashboardPageComponent,
    LoginPageComponent,
    SidebarComponent,
    ManagerHeaderComponent,
    CmiLayoutComponent,
  ],
})
export class FeaturesModule {}
