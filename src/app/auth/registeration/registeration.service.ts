import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RegisterationService {
  private url: string = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  getUser(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  loginUser(username: string, password: string): Observable<any> {
      return this.getUser().pipe(
          map(users => users.find(user => user.username === username && user.address.street === password))
      );
  }

  setCurrentUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  clearCurrentUser(): void {
    localStorage.removeItem('currentUser');
  }
}
