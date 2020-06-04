import { NgModule } from '@angular/core';
import { Routes, RouterModule,CanActivate } from '@angular/router';
import { WelcomeComponent } from './private/welcome/welcome.component';
import { AppComponent } from './app.component';
import { 
  AuthGuardService as AuthGuard 
} from './auth/auth-guard.service';

const routes: Routes = [
  { path: '',   redirectTo: '/landing', pathMatch: 'full' },
  { 
  path: 'welcome', 
  component: WelcomeComponent,
  canActivate: [AuthGuard]  
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



    //loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    //canLoad: [AuthGuard]
