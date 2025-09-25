import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionService } from '../services/auction.service';
import { BidService } from '../services/bid.service';
import { RecommendationsService } from '../services/recommendations.service';

@Component({
  selector: 'app-place-bid',
  standalone: false,
  templateUrl: './place-bid.component.html',
  styleUrl: './place-bid.component.css'
})
export class PlaceBidComponent {
  user: any;
  auction: any;

  bids: any[] = [];
  page = 0;
  size = 3;
  totalPages = 0;

  bid: any = {
    amount: 0,
    bidtime: null,
    bidderId: null,
    auctionId: null
  };
  newBidAmount: number = 0;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private auctionService: AuctionService,
    private bidService: BidService,
    private recommendationsService: RecommendationsService
  ) {}

  ngOnInit(): void {
    const userid = Number(this.route.snapshot.params['userid']);
    if (userid) {
      this.userService.getUserById(userid).subscribe({
        next: (user) => {
          this.user = user;
        },
          error: (err) => console.log(err)
      });
    }
    const auctionid = Number(this.route.snapshot.params['auctionid']);
    if (auctionid) {
      this.auctionService.getAuctionById(auctionid).subscribe({
        next: (auction) => {
          this.auction = auction;
          this.loadBids();
        },
          error: (err) => console.log(err)
      });
    }
  }

  loadBids(): void {
    this.bidService.getBidsByAuctionId(this.auction.auctionid, this.page, this.size).subscribe(data => {
      this.bids = data.content;
      this.totalPages = data.totalPages;
    });
  }

  backToBidderPage(): void {
    this.router.navigate(['app-bidder', this.user.userid]);
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadBids();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadBids();
    }
  }

  submitBid(): void {
    if (!this.newBidAmount || this.newBidAmount <= this.auction.currentBid) {
      alert('Bid must be higher than current bid');
      return;
    }

    if (this.newBidAmount >= this.auction.buyPrice) { 
      if (confirm("By bidding " + this.newBidAmount + ", you will instantly buy the item. Confirm?")) {
        this.buyNow();
      }
      return;
    }

    this.bidService.placeBid(this.auction.auctionid, this.user.userid, this.newBidAmount).subscribe({
      next: () => {
        this.recommendationsService.logInteraction(this.user.userid, this.auction.auctionid, 'BID', this.newBidAmount);
        this.loadBids();
        this.newBidAmount = 0;
      },
      error: (err) => {
        console.error('Error placing bid:', err);
        alert('Failed to place bid: ' + err.error?.message);
      }
    });
  }

  buyNow(): void {
    this.auctionService.buyNow(this.auction.auctionid, this.user.userid).subscribe({
      next: (response) => {
        alert('You have successfully bought the item!');
        this.router.navigate(['app-bidder', this.user.userid]);
      },
      error: (err) => {
        console.log('Error buying item: ' + err);
        alert('Error buying item');
      }
    });
  }
}
