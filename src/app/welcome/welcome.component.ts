import { Component } from '@angular/core';
import { UserService, User } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: false,
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    this.userService.login(this.username, this.password).subscribe({
      next: (user) => {
        if (user.username === 'admin') {
          this.router.navigate(['/app-admin']);
        } else {
          this.router.navigate(['/app-main-visitor']);
        }
      },
      error: (err) => {
        console.error(err);
        this.message = `Login failed: ${err.message}`;
      }
    })
  }
}
