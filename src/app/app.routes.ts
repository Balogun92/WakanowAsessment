import { Routes } from '@angular/router';
import { LoginComponent } from './pages/public/login/login.component';
import { UsersComponent } from './pages/components/users/users.component';


export const routes: Routes = [
{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
},
{
  path: 'home',
  component: LoginComponent
},
{
  path: 'users',
  component: UsersComponent
},
{
  path: '**',
  redirectTo: 'home',
  pathMatch: 'full'
}
];
