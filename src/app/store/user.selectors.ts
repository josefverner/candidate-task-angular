import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducers';
import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users,
);

export const selectUserRole = createFeatureSelector<UserRole>('userRole');

export const selectFilteredUsers = createSelector(
  selectUsers,
  selectUserRole,
  (users, userRole) => {
    if (!userRole) return users;

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
  },
);
