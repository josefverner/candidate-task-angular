import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  startWith,
} from 'rxjs';
import { User } from 'src/app/types/user.type';
import { selectFilteredUsers } from 'src/app/store/user.selectors';
import { UserCardComponent } from '../user-card/user-card.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserStatus } from 'src/app/enums/user-status.enum';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  store = inject(Store);
  router = inject(Router);

  userStatusEnum = UserStatus;

  users$: Observable<User[]> = this.store.select(selectFilteredUsers);
  filteredUsers$: Observable<User[]>;

  nameFilter = new FormControl('');
  emailFilter = new FormControl('');
  statusFilter$ = new BehaviorSubject<string[]>([]);

  constructor() {
    this.filteredUsers$ = combineLatest([
      this.users$,
      this.nameFilter.valueChanges.pipe(startWith('')),
      this.emailFilter.valueChanges.pipe(startWith('')),
      this.statusFilter$,
    ]).pipe(
      map(([users, name, email, statuses]) =>
        users.filter((user) =>
          this.applyFilters(user, name ?? '', email ?? '', statuses),
        ),
      ),
    );
  }

  toggleStatusFilter(status: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const currentStatuses = this.statusFilter$.value;

    const updatedStatuses = checkbox.checked
      ? [...currentStatuses, status]
      : currentStatuses.filter((filteredStatus) => filteredStatus !== status);

    this.statusFilter$.next(updatedStatuses);
  }

  private applyFilters(
    user: User,
    name: string,
    email: string,
    statuses: string[],
  ): boolean {
    const fullName = `${user.name} ${user.lastname}`.toLowerCase();
    const matchesName = name ? fullName.includes(name.toLowerCase()) : true;
    const matchesEmail = email
      ? user.email.toLowerCase().includes(email.toLowerCase())
      : true;
    const matchesStatus =
      statuses.length > 0 ? statuses.includes(user.status) : true;

    return matchesName && matchesEmail && matchesStatus;
  }
}
