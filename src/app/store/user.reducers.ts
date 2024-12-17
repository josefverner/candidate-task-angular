import { createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersSuccess, setUserRole } from './user.actions';
import { User } from '../types/user.type';
import { UserRole } from '../enums/user-role.enum';

export interface UserState {
  users: User[];
}

export const initialUserState: UserState = {
  users: [],
};

export const initialUserRoleState: UserRole = UserRole.Admin;

export const userReducer = createReducer<UserState>(
  initialUserState,
  on(loadUsers, (state) => ({
    ...state,
  })),
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
  })),
);

export const userRoleReducer = createReducer<UserRole>(
  initialUserRoleState,
  on(setUserRole, (_, { userRole }) => userRole),
);
