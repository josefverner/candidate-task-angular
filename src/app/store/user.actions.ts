import { createAction, props } from '@ngrx/store';
import { User } from '../types/user.type';

export const loadUsers = createAction('[User] Load Users');

export const loadUsersSuccess = createAction(
  '[User API] Users Loaded Success',
  props<{ users: User[] }>()
);
