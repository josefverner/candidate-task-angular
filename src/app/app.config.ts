import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';

import { routes } from './app.routes';
import { userReducer } from './store/user.reducers';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './store/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideStore({
      user: userReducer,
      router: routerReducer,
    }),
    provideEffects([UserEffects]),
    provideRouterStore(),
  ],
};
