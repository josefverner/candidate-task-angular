import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap, tap, withLatestFrom } from 'rxjs';
import { loadUsers, loadUsersSuccess, setUserRole } from './user.actions';
import { UserService } from '../service/user.service';
import { selectUserRole } from './user.selectors';
import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';
import { User } from '../types/user.type';

@Injectable()
export class UserEffects {
  actions$ = inject(Actions);
  userService$ = inject(UserService);
  store = inject(Store);

  loadUsers = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUsers),
      withLatestFrom(this.store.select(selectUserRole)),
      mergeMap(([_, userRole]) =>
        this.userService$.fetchAllUsers().pipe(
          // tap((users) => console.log(users)),
          map((users) => {
            const filteredUsers = this.getFilteredUsers(users, userRole);
            return loadUsersSuccess({ users: filteredUsers });
          }),
          catchError((error) => {
            console.error('Error loading users:', error);
            return EMPTY;
          }),
        ),
      ),
    );
  });

  loadUsersOnUserRoleChange = createEffect(() => {
    return this.actions$.pipe(
      ofType(setUserRole),
      map(() => loadUsers()),
    );
  });

  private getFilteredUsers(users: User[], userRole: UserRole): User[] {
    return users.filter((user) => {
      switch (userRole) {
        case UserRole.Admin:
          return true;
        case UserRole.Manager:
          return (
            user.status === UserStatus.Active ||
            user.status === UserStatus.Inactive
          );
        case UserRole.User:
          return (
            user.status === UserStatus.Active && user.role === UserRole.User
          );
        default:
          return false;
      }
    });
  }
}
