import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs';
import { loadUsers, loadUsersSuccess } from './user.actions';
import { User } from '../types/user.type';

const DATA_URL = '/assets/data/users.mock.json';

@Injectable()
export class UserEffects {
  actions$ = inject(Actions);
  http = inject(HttpClient);

  loadUser = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() => {
        // return this.http.get<User[]>(DATA_URL).pipe(
        //   tap((users) => console.log(users)),
        //   map((users) => loadUsersSuccess({ users }))
        // );
        return this.http.get<User[]>(DATA_URL).pipe(
          tap((users) => console.log(users)),
          map((users) => loadUsersSuccess({ users }))
          // catchError((error) => {
          //   console.error('Error loading users:', error);
          //   return EMPTY; // Or dispatch a failure action
          // })
        );
      })
    );
  });
}
