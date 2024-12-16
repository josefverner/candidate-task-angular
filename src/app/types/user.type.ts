import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';

export type User = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  joinedDate: string;
  lastLogin: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
};
