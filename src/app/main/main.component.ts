import { Component, OnInit } from '@angular/core';
import { PostService } from './posts/posts.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})


export class MainComponent implements OnInit {

  headline: string = 'Welcome to my profile!';
  newHeadline: string = ''; // Temporary storage for the new headline being edited
  avatarUrl: string = 'https://picsum.photos/id/237/200/300'; // Assuming a local path; replace with actual path


  posts: any[] = []; // Store the posts

  constructor(private postService: PostService) {}  // Inject the PostService

  ngOnInit(): void {
    this.postService.getPosts().subscribe(data => {
      this.posts = data;
    });
  }

  updateHeadline(): void {
    if (this.newHeadline.trim()) {
      this.headline = this.newHeadline.trim();
      this.newHeadline = ''; // Clearing the input field
    }
  }

}