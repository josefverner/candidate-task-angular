import { createAction, props } from '@ngrx/store';
import { User } from '../types/user.type';
import { UserRole } from '../enums/user-role.enum';

export const loadUsers = createAction('[User] Load Users');

export const loadUsersSuccess = createAction(
  '[User API] Users Loaded Success',
  props<{ users: User[] }>(),
);

export const setUserRole = createAction(
  '[Header] Set User Role',
  props<{ userRole: UserRole }>(),
);

export const updateUser = createAction(
  '[User Detail] Update User',
  props<{ user: User }>(),
);

// export const addUser = createAction(
//   '[User Detail] Add User',
//   props<{ user: User }>(),
// );
