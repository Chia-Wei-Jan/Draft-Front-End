import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  @Input() post: any;

  editPost(postId: number): void {
    console.log(postId);
  }

  submitComment(postId: number, comment: string): void {
    console.log(postId, comment);
  }
}
