import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionService } from '../services/auction.service';
import { BidService } from '../services/bid.service';

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
  bidPage = 0;
  bidPageSize = 3;
  totalBidPages = 0;

  bid: any = {
    amount: 0,
    bidtime: null,
    bidderId: null,
    auctionId: null
  };
  newBidAmount: number = 0;

  constructor (
    private route: ActivatedRoute,
    private userService: UserService,
    private auctionService: AuctionService,
    private bidService: BidService
  ) {}

  ngOnInit(): void {
    const userid = Number(this.route.snapshot.params['userid']);
    const auctionid = Number(this.route.snapshot.params['auctionid']);
    if (userid && auctionid) {
      this.userService.getUserById(userid).subscribe(data => {
        this.user = data;
      });
      this.auctionService.getAuctionById(auctionid).subscribe(data => {
        this.auction = data;
        this.loadBids();
      });
    }
  }

  loadBids(): void {
    this.bidService.getBidsByAuctionId(this.auction.auctionid, this.bidPage, this.bidPageSize).subscribe(data => {
      this.bids = data.content;
      this.totalBidPages = data.totalPages;
    });
  }

  nextBidPage(): void {
    if (this.bidPage < this.totalBidPages - 1) {
      this.bidPage++;
      this.loadBids();
    }
  }

  prevBidPage(): void {
    if (this.bidPage > 0) {
      this.bidPage--;
      this.loadBids();
    }
  }

  submitBid(): void {
    if (!this.newBidAmount || this.newBidAmount <= this.auction.currentBid) {
      alert('Bid must be higher than current bid');
      return;
    }

    this.bidService.placeBid(this.auction.auctionid, this.user.userid, this.newBidAmount).subscribe({
      next: () => {
        alert('Bid placed successfully!');
        this.loadBids();
        this.newBidAmount = 0;
      },
      error: (err) => {
        console.error('Error placing bid:', err);
        alert('Failed to place bid: ' + err.error?.message);
      }
    });
  }
}
