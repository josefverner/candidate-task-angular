import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';

export type User = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phome: string;
  username: string;
  password: string;
  joinedDate: string;
  lastLogin: string;
  role: UserRole;
  status: UserStatus;
};
