import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { User } from '../types/user.type';
import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';
import { provideHttpClient } from '@angular/common/http';

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Max',
    lastname: 'Mustermann',
    email: 'max.mustermann@test.com',
    joiningDate: '2021-01-01',
    role: UserRole.User,
    status: UserStatus.Inactive,
  },
  {
    id: 2,
    name: 'Maximine',
    lastname: 'Mustermann',
    email: 'maximine.mustermann@test.com',
    joiningDate: '2021-01-01',
    role: UserRole.Admin,
    status: UserStatus.Active,
  },
];

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all users', () => {
    service.fetchAllUsers().subscribe((users) => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('/assets/data/users.mock.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
