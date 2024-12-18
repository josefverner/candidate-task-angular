import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap, tap, withLatestFrom } from 'rxjs';
import { loadUsers, loadUsersSuccess } from './user.actions';
import { UserService } from '../services/user.service';
import { selectUserRole } from './user.selectors';
import { filterUsersByRole } from '../utils/user-filter';

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
            const filteredUsers = filterUsersByRole(users, userRole);
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
}
