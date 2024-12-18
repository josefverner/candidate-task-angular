import { createReducer, on } from '@ngrx/store';
import {
  loadUsers,
  loadUsersSuccess,
  setUserRole,
  updateUser,
} from './user.actions';
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
  on(updateUser, (state, { user }) => ({
    ...state,
    users: state.users.map((mappedUser) =>
      mappedUser.id === user.id ? { ...mappedUser, ...user } : mappedUser,
    ),
  })),
);

export const userRoleReducer = createReducer<UserRole>(
  initialUserRoleState,
  on(setUserRole, (_, { userRole }) => userRole),
);
