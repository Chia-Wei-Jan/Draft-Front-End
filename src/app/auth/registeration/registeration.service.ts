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

  getFollowedUsers(userId: number): Observable<any[]> {
    let followId1 = userId + 1;
    let followId2 = userId + 2;
    let followId3 = userId + 3;

    if(followId1 > 10)  followId1 -= 10;
    if(followId2 > 10)  followId2 -= 10;
    if(followId3 > 10)  followId3 -= 10;

    let followIds = [followId1, followId2, followId3];
    
    return this.getUser().pipe(
      map(users => 
        users.filter(user => followIds.includes(user.id))
          .map(user => ({
              ...user,
              headline: user.company.catchPhrase  // Map catchPhrase as headline
          })
        )
      )
    );
  }

  clearCurrentUser(): void {
    localStorage.clear();
    localStorage.removeItem('currentUser');
  }
}
