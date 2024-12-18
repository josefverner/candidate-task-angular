import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducers';
import { UserRole } from '../enums/user-role.enum';
import { filterUsersByRole } from '../utils/user-filter';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users,
);

export const selectUserRole = createFeatureSelector<UserRole>('userRole');

export const selectFilteredUsers = createSelector(
  selectUsers,
  selectUserRole,
  (users, userRole) => filterUsersByRole(users, userRole),
);
