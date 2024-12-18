import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';
import { User } from '../types/user.type';

export const filterUsersByRole = (
  users: User[],
  userRole: UserRole,
): User[] => {
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
        return user.status === UserStatus.Active && user.role === UserRole.User;
      default:
        return false;
    }
  });
};
