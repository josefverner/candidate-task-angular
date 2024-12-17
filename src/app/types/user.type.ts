import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';

export type User = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  joiningDate: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
};
