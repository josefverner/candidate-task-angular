import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { loadUsers, loadUsersSuccess } from './store/user.actions';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { LocalStorageService } from './services/local-storage.service';

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
  localStorageService = inject(LocalStorageService);

  ngOnInit(): void {
    const storedUsers = this.localStorageService.getData();

    if (storedUsers.length > 0) {
      this.store.dispatch(loadUsersSuccess({ users: storedUsers }));
    } else {
      this.store.dispatch(loadUsers());
    }
  }
}
