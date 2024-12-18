import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { LocalStorageService } from './services/local-storage.service';
import { loadUsers, loadUsersSuccess } from './store/user.actions';
import { User } from './types/user.type';
import { UserRole } from './enums/user-role.enum';
import { UserStatus } from './enums/user-status.enum';

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
    email: 'Mmximine.mustermann@test.com',
    joiningDate: '2021-01-01',
    role: UserRole.Admin,
    status: UserStatus.Active,
  },
];

class MockLocalStorageService {
  getData(): User[] {
    return [];
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let store: MockStore;
  let localStorageService: MockLocalStorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideMockStore(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    localStorageService = TestBed.inject(
      LocalStorageService,
    ) as unknown as MockLocalStorageService;

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadUsersSuccess if storedUsers are available', () => {
    spyOn(localStorageService, 'getData').and.returnValue(mockUsers);
    const dispatchSpy = spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(dispatchSpy).toHaveBeenCalledWith(
      loadUsersSuccess({ users: mockUsers }),
    );
  });

  it('should dispatch loadUsers if no storedUsers are available', () => {
    spyOn(localStorageService, 'getData').and.returnValue([]);
    const dispatchSpy = spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(dispatchSpy).toHaveBeenCalledWith(loadUsers());
  });
});
