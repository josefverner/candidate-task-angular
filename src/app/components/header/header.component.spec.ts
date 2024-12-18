import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HeaderComponent } from './header.component';
import { UserRole } from 'src/app/enums/user-role.enum';
import { setUserRole } from 'src/app/store/user.actions';
import { selectUserRole } from 'src/app/store/user.selectors';
import { By } from '@angular/platform-browser';
import { DebugElement, ComponentRef } from '@angular/core';
import { Observable } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let componentRef: ComponentRef<HeaderComponent>;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore;
  let mockSelectUserRole: Observable<UserRole>;

  beforeEach(async () => {
    mockSelectUserRole = new Observable<UserRole>();

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectUserRole, value: UserRole.Admin }],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('title', 'Test Title');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title input', () => {
    expect(component.title()).toBe('Test Title');
    componentRef.setInput('title', 'A new Test Title');
    expect(component.title()).toBe('A new Test Title');
  });

  it('should select user role from store', () => {
    component.userRole$.subscribe((role) => {
      expect(role).toBe(UserRole.Admin);
    });
  });

  it('should dispatch setUserRole action on switchUserType', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const event = {
      target: { value: UserRole.User },
    } as unknown as Event;

    component.switchUserType(event);

    expect(dispatchSpy).toHaveBeenCalledWith(
      setUserRole({ userRole: UserRole.User }),
    );
  });

  it('should render user roles in the template', () => {
    const debugElement: DebugElement = fixture.debugElement;
    const selectElement = debugElement.query(By.css('select'));
    expect(selectElement).toBeTruthy();
  });
});
