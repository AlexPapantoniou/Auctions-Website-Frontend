import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

import { User } from '../model/user.model';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  user: User = { 
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    city: '',
    country: '',
    email: '',
    phonenumber: '',
    afm: '',
    accepted: false
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.user.password !== (document.getElementById('confirmpassword') as HTMLInputElement).value) {
      alert('Passwords do not match');
      return;
    }
    this.userService.signup(this.user).subscribe({
      next: () => {
        this.user = { 
          username: '',
          password: '',
          firstname: '',
          lastname: '',
          city: '',
          country: '',
          email: '',
          phonenumber: '',
          afm: '',
          accepted: false
        };
        this.router.navigate(['/app-waiting']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}