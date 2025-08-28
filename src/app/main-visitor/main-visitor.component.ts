import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-visitor',
  standalone: false,
  templateUrl: './main-visitor.component.html',
  styleUrl: './main-visitor.component.css'
})
export class MainVisitorComponent {
  constructor(private router: Router) {};

  onVisitorTypeChange(event: Event) {
    const option = (event.target as HTMLSelectElement).value;
    if (option === "visitor") {
      this.router.navigate(['app-visitor']);
    }
    else if (option === "bidder") {
      this.router.navigate(['app-bidder']);
    }
    else if (option === "seller") {
      this.router.navigate(['app-seller']);
    }
    else {
      this.router.navigate(['app-main-visitor']);
    }
  }
}
