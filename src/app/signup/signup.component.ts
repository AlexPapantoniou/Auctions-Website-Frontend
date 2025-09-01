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
  user: User = { username: '', password: '', firstname: '', lastname: '', city: '', address: '', email: '', phonenumber: '', afm: '', accepted: false };
  message: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    this.userService.signup(this.user).subscribe({
      next: (savedUser) => {
        this.user = { username: '', password: '', firstname: '', lastname: '', city: '', address: '', email: '', phonenumber: '', afm: '', accepted: false };
        this.router.navigate(['/app-waiting']);
      },
      error: (err) => {
        console.error(err);
        this.message = `Error registering user: ${err.message}`;
      }
    });
  }
}