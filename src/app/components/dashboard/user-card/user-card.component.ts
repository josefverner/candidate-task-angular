import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/types/user.type';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const AVATAR_PATH = '/assets/images/';
const AVATAR_DUMMY = 'user-dummy.png';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  user = input.required<User>();
  icons = { faEnvelope };

  get userAvatarSrc(): string {
    return this.user().avatar
      ? AVATAR_PATH + this.user().avatar
      : AVATAR_PATH + AVATAR_DUMMY;
  }

  get statusHighlight(): string {
    return (this.user().status as string).toLowerCase();
  }
}
