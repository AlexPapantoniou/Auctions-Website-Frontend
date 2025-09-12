import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ItemService } from '../services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionService } from '../services/auction.service';

@Component({
  selector: 'app-reauction',
  standalone: false,
  templateUrl: './reauction.component.html',
  styleUrl: './reauction.component.css'
})
export class ReauctionComponent {
  user: any;

  items: any[] = [];
  page = 0;
  size = 3;
  totalPages = 0;

  showForm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private auctionService: AuctionService,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    const userid = Number(this.route.snapshot.params['id']);
    if (userid) {
      this.userService.getUserById(userid).subscribe(data => {
        this.user = data;
        this.loadItems();
      });
    }
  }

  loadItems(): void {
    this.itemService.getItemsByOwner(this.user.userid).subscribe(data => {
      this.items = data.content;
      this.totalPages = data.totalPages;
    });
  }

  backToSellerPage(): void {
    this.router.navigate(['app-seller', this.user.userid]);
  }

  createNewAuction(): void {
    this.router.navigate(['app-create-auction', this.user.userid]);
  }

  toggleForm(item: any): void {
    this.showForm = !this.showForm
    if (!item.auction) {
      item.auction = {
        firstBid: null,
        buyPrice: null,
        startTime: null,
        EndTime: null,
        address: null,
        location: null,
        city: null,
        country: null
      };
    }
  }

  createAuction(item: any): void {
    this.auctionService.addAuction(item.auction).subscribe({
      next: (savedAuction) => {
        alert('Auction submitted successfully');
        this.router.navigate(['app-seller', this.user.userid]);
      },
      error: (err) => {
        console.error('Error submitting auction: ', err);
        alert('Error submitting auction.');
      }
    });
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadItems();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadItems();
    }
  }
}
