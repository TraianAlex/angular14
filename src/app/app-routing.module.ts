import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';
import { RoleGuard } from './guard/role.guard';

const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent), canActivate: [AuthGuard] },
  { path: 'about', loadComponent: () => import('./about/about.component').then(m => m.AboutComponent), canActivate: [AuthGuard] },
  { path: 'user', loadComponent: () => import('./user/user.component').then(m => m.UserComponent), canActivate: [RoleGuard] },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent),
    children: [
      { path: 'add', loadComponent: () => import('./add-contact/addcontact.component').then(m => m.AddcontactComponent) },
      { path: 'edit/:id', loadComponent: () => import('./add-contact/addcontact.component').then(m => m.AddcontactComponent) },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'access',
    loadChildren: () =>
      import('./access/access.module').then((opt) => opt.AccessModule),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((opt) => opt.LoginComponent),
  },
  { path: '**', loadComponent: () => import('./status/status.component').then(m => m.StatusComponent) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
