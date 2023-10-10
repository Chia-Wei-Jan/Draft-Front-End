import { Component, OnInit } from '@angular/core';
import { PostService } from './posts/posts.service';
import { RegisterationService } from '../auth/registeration/registeration.service';
import { Router } from '@angular/router';

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
  user: any;
  username: string = '';

  newPostTitle: string = '';
  newPostContent: string = '';

  searchKeyword: string = '';
  filterPost: any[] = [];

  selectImage: File | null = null;

  constructor(private postService: PostService, private registerationService: RegisterationService, private router: Router) {}  // Inject the PostService

  ngOnInit(): void {
    const currentUser = this.registerationService.getCurrentUser();
    
    if(currentUser && currentUser.id) {
      this.postService.getUser(currentUser.id).subscribe(data => {
        this.user = data;
        this.username = data.username;
      })

      this.postService.getPosts(currentUser.id).subscribe(data => {
        this.posts = data;

        this.posts.forEach(post => {
          this.postService.getAuthor(post.userId).subscribe(author => {
            post.authorName = author.name;
          });
        });
        this.searchPost();
      });
      
    }

  }

  updateHeadline(): void {
    if (this.newHeadline.trim()) {
      this.headline = this.newHeadline.trim();
      this.newHeadline = ''; // Clearing the input field
    }
  }

  uploadImage(event: Event): void {
    const input = event?.target as HTMLInputElement;
    if(input.files && input.files[0]) {
      this.selectImage = input.files[0];
    }
  }

  submitPost(): void {
    if(this.newPostTitle.trim() && this.newPostContent.trim()) {
      const newPost = {
        title: this.newPostTitle,
        body: this.newPostContent,
        authorName: this.username
      }

      this.filterPost.unshift(newPost);
      this.posts.unshift(newPost);

      this.newPostTitle = '';
      this.newPostContent = '';
    }
  }

  searchPost(): void {
    if(this.searchKeyword) {
      const tolowerSearchKeyword = this.searchKeyword.toLocaleLowerCase();
      this.filterPost = this.posts.filter(post => 
        post.authorName && post.authorName.toLocaleLowerCase().includes(tolowerSearchKeyword) || post.body && post.body.toLocaleLowerCase().includes(tolowerSearchKeyword)
      );
    }
    else {
      this.filterPost = [...this.posts];
    }
  }

  clearPost(): void {
    this.newPostTitle = '';
    this.newPostContent = '';
  }

  editPost(postId: number): void {
    console.log('Editing post with ID:', postId);
  }

  commentPost(postId: number): void {
    console.log('Commenting on post with ID:', postId);
  }

  viewProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.registerationService.clearCurrentUser();
    this.router.navigate(['\auth']);
  }

}