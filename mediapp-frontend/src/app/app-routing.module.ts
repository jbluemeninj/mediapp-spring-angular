import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { Not404Component } from './pages/not404/not404.component';
import { ForgotComponent } from './pages/login/forgot/forgot.component';
import { RandomComponent } from './pages/login/forgot/random/random.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },    
  {
    path: 'pages',
    component: LayoutComponent,
    loadChildren: () => import('./pages/pages.routes').then((x)=> x.PagesRoutes)
  },
  {
    path: 'forgot',
    component: ForgotComponent,
    children: [{ path: ':random', component: RandomComponent }],
  },
  { path: 'not-404', component: Not404Component},
  { path: '**', redirectTo: 'not-404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

