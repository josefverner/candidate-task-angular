import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, switchMap, tap } from 'rxjs';
import { loadUsers, loadUsersSuccess } from './user.actions';
import { UserService } from '../service/user.service';

@Injectable()
export class UserEffects {
  actions$ = inject(Actions);
  userService$ = inject(UserService);

  loadUsers = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() => {
        return this.userService$.fetchAllUsers().pipe(
          //tap((users) => console.log(users)),
          map((users) => loadUsersSuccess({ users })),
          catchError((error) => {
            console.error('Error loading users:', error);
            return EMPTY;
          }),
        );
      }),
    );
  });
}
