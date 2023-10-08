import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private userUrl: string = 'https://jsonplaceholder.typicode.com/users';
  private postUrl: string = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { 
  }

  getUser(userId: number): Observable<any> {
    return this.http.get<any>(`${this.userUrl}/${userId}`);
}

  getPosts(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.postUrl}?userId=${userId}`);
  }
}
