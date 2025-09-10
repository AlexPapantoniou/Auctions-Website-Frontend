import { AuctionService } from './../services/auction.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BidService } from '../services/bid.service';

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrl: './auction-details.component.css',
  standalone: false
})
export class AuctionDetailsComponent {
  auction: any;

  bids: any[] = [];
  page: number = 0;
  size: number = 10;
  totalPages: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auctionService: AuctionService,
    private bidService: BidService
  ) {}

  ngOnInit(): void {
    const auctionid = Number(this.route.snapshot.params['id']);
    if (auctionid) {
      this.auctionService.getAuctionById(auctionid).subscribe(data => {
        this.auction = data;
        this.loadBids();
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
    const location = this.auction.item.address + ', ' + this.auction.item.location + ', ' + this.auction.item.city + ', ' + this.auction.item.country;
    this.router.navigate(['/app-item-map', location]);
  }
  
}
