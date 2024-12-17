import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from 'src/app/types/user.type';
import { Store } from '@ngrx/store';
import { selectUsers } from 'src/app/store/user.selectors';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  users$: Observable<User[]>;

  store = inject(Store);

  constructor() {
    this.users$ = this.store.select(selectUsers);
  }
}
