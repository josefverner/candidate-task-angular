import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsers } from './store/user.actions';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.scss'],
  imports: [HeaderComponent, DashboardComponent],
})
export class AppComponent implements OnInit {
  title = 'Userlane Angular Task';
  store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }
}
