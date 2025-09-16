import { AuctionService } from './../services/auction.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BidService } from '../services/bid.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrl: './auction-details.component.css',
  standalone: false
})
export class AuctionDetailsComponent {
  auction: any;
  user: any;

  bids: any[] = [];
  page: number = 0;
  size: number = 10;
  totalPages: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auctionService: AuctionService,
    private userService: UserService,
    private bidService: BidService
  ) {}

  ngOnInit(): void {
    const auctionid = Number(this.route.snapshot.params['auctionid']);
    if (auctionid) {
      this.auctionService.getAuctionById(auctionid).subscribe(data => {
        this.auction = data;
        this.loadBids();
      });
    }
    const userid = Number(this.route.snapshot.params['userid']);
    if (userid) {
      this.userService.getUserById(userid).subscribe(data => {
        this.user = data;
      });
    }
  }

  loadBids(): void {
    this.bidService.getBidsByAuctionId(this.auction.auctionid, this.page, this.size).subscribe(data => {
      this.bids = data.content;
      this.totalPages = data.totalPages;
    });
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadBids();
    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadBids();
    }
  }

  viewMap(): void {
    const location = this.auction.address + ', ' + this.auction.location + ', ' + this.auction.city + ', ' + this.auction.country;
    this.router.navigate(['/app-item-map', location]);
  }
  
}
