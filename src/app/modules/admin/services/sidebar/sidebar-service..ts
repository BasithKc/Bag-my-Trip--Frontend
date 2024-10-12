import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();

  toggleSidebar(value:boolean) {
    this.isOpenSubject.next(value);
  }

  closeSidebar() {
    this.isOpenSubject.next(false);
  }
}