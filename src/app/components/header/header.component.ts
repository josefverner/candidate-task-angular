import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRole } from 'src/app/enums/user-role.enum';
import { Store } from '@ngrx/store';
import { setUserRole } from 'src/app/store/user.actions';
import { Observable } from 'rxjs';
import { selectUserRole } from 'src/app/store/user.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  title = input.required<string>();
  store = inject(Store);

  userRole$: Observable<UserRole> = this.store.select(selectUserRole);

  userRoles: UserRole[] = Object.keys(UserRole).map(
    (key) => UserRole[key as keyof typeof UserRole],
  );

  switchUserType(event: Event): void {
    const selectedUserRole = (event.target as HTMLSelectElement)
      .value as UserRole;
    this.store.dispatch(setUserRole({ userRole: selectedUserRole }));
  }
}
