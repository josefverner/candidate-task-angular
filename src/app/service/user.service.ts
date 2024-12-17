import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../types/user.type';
import { Observable } from 'rxjs';

const DATA_MOCK_URL = '/assets/data/users.mock.json';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  fetchAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(DATA_MOCK_URL);
  }

  fetchUserById(id: number): Observable<User> {
    return this.http.get<User>(`${DATA_MOCK_URL}/${id}`);
  }
}
