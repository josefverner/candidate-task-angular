import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { UserRole } from 'src/app/enums/user-role.enum';
import { selectUserRole, selectUsers } from 'src/app/store/user.selectors';
import { User } from 'src/app/types/user.type';
import { updateUser } from 'src/app/store/user.actions';
import { UserStatus } from 'src/app/enums/user-status.enum';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  store = inject(Store);
  route = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  userRole$: Observable<UserRole> = this.store.select(selectUserRole);
  user$: Observable<User | undefined>;
  userForm: FormGroup;

  userStatusEnum = UserStatus;
  userRoleEnum = UserRole;

  constructor() {
    const userId = this.route.snapshot.params['id'];

    this.user$ = this.store.select(selectUsers).pipe(
      // tap((users) => console.log('users', users)),
      map((users) => users.find((user) => user.id === +userId)),
    );

    this.userForm = this.formBuilder.group({
      id: [null],
      name: [''],
      lastname: [''],
      email: [''],
      joiningDate: [''],
      avatar: [''],
      role: [''],
      status: [''],
    });

    this.user$.subscribe((user) => {
      if (user) {
        this.userForm.patchValue(user);
      }
    });
  }

  saveUser(): void {
    if (this.userForm.valid) {
      this.store.dispatch(updateUser({ user: this.userForm.value }));
      this.router.navigate(['/users']);
    }
  }

  /*
  addUser(): void {
    if (this.userForm.valid) {
      this.store.dispatch(addUser({ user: this.userForm.value }));
    }
  }

  deleteUser(): void {
    console.log('delete user');
  }*/
}
