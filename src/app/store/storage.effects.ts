import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalStorageService } from '../service/local-storage.service';
import { Store } from '@ngrx/store';
import { loadUsersSuccess, updateUser } from './user.actions';
import { tap, withLatestFrom } from 'rxjs/operators';
import { selectUsers } from './user.selectors';

@Injectable()
export class StorageEffects {
  actions$ = inject(Actions);
  store = inject(Store);
  localStorageService = inject(LocalStorageService);

  syncStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadUsersSuccess, updateUser),
        withLatestFrom(this.store.select(selectUsers)),
        tap(([, users]) => {
          this.localStorageService.setData(users);
        }),
      ),
    { dispatch: false },
  );
}
