import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/types/user.type';
import { Store } from '@ngrx/store';
import { selectUsers } from 'src/app/store/user.selectors';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  users$: Observable<User[]>;

  store = inject(Store);

  constructor() {
    console.log('UserListComponent');
    this.users$ = this.store.select(selectUsers);
    //this.users$ = this.store.select('user');
    //  this.users$.subscribe((users) => console.log(users));
  }
}
