import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuctionService } from '../services/auction.service';
import { UserService } from './../services/user.service';

@Component({
  selector: 'app-create-auction',
  standalone: false,
  templateUrl: './create-auction.component.html',
  styleUrl: './create-auction.component.css'
})
export class CreateAuctionComponent {
  user: any;
  auction: any = {
    item: {
      name: '',
      location: '',
      country: '',
      description: ''
    },
    buyPrice: null,
    firstBid: null
  };

  categories: string[] = [''];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private auctionService: AuctionService,
  ) {}

  ngOnInit(): void {
    const userid = Number(this.route.snapshot.params['userid']);
    if (userid) {
      this.auction.seller = { userid: userid };
      this.userService.getUserById(userid).subscribe({
        next: (user) => this.user = user,
        error: (err) => console.error(err)
      });
    }
  }

  backToSellerPage() {
    this.router.navigate(['app-seller', this.user.userid]);
  }

  reauctionMyItems() {
    this.router.navigate(['app-reauction', this.user.userid]);
  }

  formatDateForInput(dateString: string | Date): string {
    if (!dateString) {
      return '';
    }
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  }
  
  addCategory() {
    this.categories.push('');
  }
  
  removeCategory(index: number) {
    this.categories.splice(index, 1);
  }
  
  trackByIndex(index: number, obj: any): any {
    return index;
  }

  onSubmit(): void {
    const start = new Date();
    const end = new Date(this.auction.endTime);
    this.auction.startTime = start.toISOString();
    this.auction.endTime = end.toISOString();

    this.auction.item.categories = this.categories.map(name => ({ name }));
    
    this.auctionService.addAuction(this.auction).subscribe({
      next: () => {
        alert("Auction submitted successfully!");
        this.router.navigate(['/app-seller', this.user.userid]);
      },
      error: (err) => {
        console.error('Error submitting auction: ', err);
        alert('Error submitting auction.');
      }
    });
  }
}
