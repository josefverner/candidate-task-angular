import { Routes } from '@angular/router';
import { UserListComponent } from './components/dashboard/user-list/user-list.component';
import { UserDetailComponent } from './components/dashboard/user-detail/user-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'user/:id', component: UserDetailComponent },
];
