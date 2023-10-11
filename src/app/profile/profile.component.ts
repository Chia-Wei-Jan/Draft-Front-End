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

      
      if (currentUser.address && currentUser.address.zipcode) {
        const formattedZipcode = currentUser.address.zipcode.split('-')[0];
        this.zipcode = (formattedZipcode.length === 5) ? formattedZipcode : 'Invalid';
      } else {
        this.zipcode = '';
      }
  

      if (currentUser.phone) {
        const formattedPhone = currentUser.phone.split(' x')[0];
        this.phone = formattedPhone || 'Invalid';
      } else {
        this.phone = '';
      }

      this.password = '******';  

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
