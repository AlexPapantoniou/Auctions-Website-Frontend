import { AuctionService } from './../services/auction.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrl: './auction-details.component.css',
  standalone: false
})
export class AuctionDetailsComponent {
  auction: any;

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService
  ) {}

  ngOnInit(): void {
    const auctionid = this.route.snapshot.params['auctionid'];
    this.auctionService.getAuctionById(auctionid).subscribe(data => {
      this.auction = data;
    });
  }
}
