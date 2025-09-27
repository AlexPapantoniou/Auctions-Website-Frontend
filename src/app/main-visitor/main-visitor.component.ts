import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-visitor',
  standalone: false,
  templateUrl: './main-visitor.component.html',
  styleUrl: './main-visitor.component.css'
})
export class MainVisitorComponent {
  user: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {};

  ngOnInit(): void {
    const userid = Number(this.route.snapshot.params['userid']);
    if (userid) {
      this.userService.getUserById(userid).subscribe({
        next: (user) => this.user = user,
        error: (err) => console.error(err)
      });
    }
  }

  onVisitorTypeChange(event: Event) {
    const option = (event.target as HTMLSelectElement).value;
    if (option === "visitor") {
      this.router.navigate(['app-visitor', this.user.userid]);
    }
    else if (option === "bidder") {
      this.router.navigate(['app-bidder', this.user.userid]);
    }
    else if (option === "seller") {
      this.router.navigate(['app-seller', this.user.userid]);
    }
    else {
      this.router.navigate(['app-main-visitor', this.user.userid]);
    }
  }
}
