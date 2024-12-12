import { createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersSuccess } from './user.actions';
import { User } from '../types/user.type';

export interface UserState {
  users: User[];
}

export const initialState: UserState = {
  users: [],
};

export const userReducer = createReducer(
  initialState,
  on(loadUsers, (state) => ({
    ...state,
  })),
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
  }))
);

// export const userReducer = createReducer(
//   [],
//   on(loadUsers, (state, action) => {
//     console.log('UserReducer');
//     console.log(state);
//     console.log(action);
//     return state;
//   }),
//   on(loadUsersSuccess, (state, { users }) => ({
//     ...state,
//     users,
//   }))
// );
