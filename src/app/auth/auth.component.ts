import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterationService } from './registeration/registeration.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;

  users: any[] = [];
  loginError: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private registerationService: RegisterationService) { 
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      street: ['', Validators.required],
      suite: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      phone: ['', Validators.required],
      website: ['', Validators.required],
      companyName: ['', Validators.required],
      catchPhrase: ['', Validators.required],
      bs: ['', Validators.required]
    });

  }

  ngOnInit() {
    /*
    this.registerationService.getUser().subscribe((data: any[])=> {
      this.users = data;
    });
    */
  }

  login() {
    const val = this.loginForm.value;
    if (val.username && val.password) {
      this.registerationService.loginUser(val.username, val.password).subscribe((user: any[]) => {
        if (user) {
          console.log("Successfully logged in!");
          this.router.navigate(['/main']);
          // Other successful login logic here
        } else {
          console.log("Username or password is incorrect!");
          this.loginError = 'Invalid username or password';
        }
      });
    }

  }

  register() {
    console.log('Register Username:', this.registerForm.value.username);
    console.log('Register Password:', this.registerForm.value.password);
    this.router.navigate(['/main']);
  }  
}