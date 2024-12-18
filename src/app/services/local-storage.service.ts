import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageKey = 'userlane-angular-task';

  getData(): any[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  setData(data: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }
}
