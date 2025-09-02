import { Component } from '@angular/core';
import { UserService } from '../services/user.service'; 
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

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.userService.login(this.username, this.password).subscribe({
      next: (user) => {
        if (user.username === 'admin') {
          this.router.navigate(['/app-admin']);
        } else {
          this.router.navigate(['/app-main-visitor', user.userid]);
        }
      },
      error: (err) => {
        let errorMessage = 'Login failed';
        if (err.error) {
          if (typeof err.error === 'string') {
            errorMessage = err.error;
          }
          else if (err.error.message) {
            errorMessage = err.error.message;
          }
        }
        alert("Login failed: " + errorMessage);
      }
    })
  }
}
