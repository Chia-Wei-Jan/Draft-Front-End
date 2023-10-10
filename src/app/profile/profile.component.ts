import { Component, OnInit } from '@angular/core';
import { RegisterationService } from '../auth/registeration/registeration.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  avatarUrl: string = 'https://picsum.photos/id/237/200/300'; 
  username: string = '';
  email: string = '';
  zipcode: string = '';
  phone: string = '';
  password: string = '';

  selectAvatar: File | null = null;

  constructor(private registerationService: RegisterationService) {}

  ngOnInit(): void {
    const currentUser = this.registerationService.getCurrentUser();
    if (currentUser) {
      this.username = currentUser.username || '';
      this.email = currentUser.email || '';
      this.zipcode = currentUser.address.zipcode || '';
      this.phone = currentUser.phone || '';
      this.password = '******';  // Placeholder for the password. We shouldn't display real passwords.
      if (currentUser.avatarUrl) {
        this.avatarUrl = currentUser.avatarUrl;
      }
    }
  }

  uploadAvatar(event: Event): void {
    const input = event?.target as HTMLInputElement;
    if(input.files && input.files[0]) {
      this.selectAvatar = input.files[0];
    }
  }
}
