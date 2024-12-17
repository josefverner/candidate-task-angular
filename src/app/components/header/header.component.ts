import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRole } from 'src/app/enums/user-role.enum';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  title = input.required<string>();
  userRoleSelected = UserRole.User;

  userRoles: UserRole[] = Object.keys(UserRole).map(
    (personNamedIndex) => UserRole[personNamedIndex as keyof typeof UserRole],
  );

  switchUserType(event: Event): void {
    const selectedUserRole = (event.target as HTMLSelectElement).value;
    this.userRoleSelected = selectedUserRole as UserRole;
    console.log('User type switched to:', selectedUserRole);
  }
}
