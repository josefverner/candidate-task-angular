import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';
import { User } from '../types/user.type';
import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty array when no data is set', () => {
    expect(service.getData()).toEqual([]);
  });

  it('should save and retrieve data correctly', () => {
    const testData = [{ id: 1, name: 'Test' }];
    service.setData(testData);
    expect(service.getData()).toEqual(testData);
  });

  it('should overwrite existing data', () => {
    const mockUser1: User[] = [
      {
        id: 1,
        name: 'Max',
        lastname: 'Mustermann',
        email: 'max.mustermann@test.com',
        joiningDate: '2021-01-01',
        role: UserRole.User,
        status: UserStatus.Inactive,
      },
    ];
    const mockUser2: User[] = [
      {
        id: 2,
        name: 'Maximine',
        lastname: 'Mustermann',
        email: 'Mmximine.mustermann@test.com',
        joiningDate: '2021-01-01',
        role: UserRole.Admin,
        status: UserStatus.Active,
      },
    ];

    service.setData(mockUser1);
    service.setData(mockUser2);
    expect(service.getData()).toEqual(mockUser2);
  });
});
