import { AuctionService } from './../services/auction.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-auction',
  standalone: false,
  templateUrl: './edit-auction.component.html',
  styleUrl: './edit-auction.component.css'
})
export class EditAuctionComponent {
  auction: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auctionService: AuctionService
  ) {}

  ngOnInit(): void {
    const auctionid = Number(this.route.snapshot.params['auctionid']);
    if (auctionid) {
      this.auctionService.getAuctionById(auctionid).subscribe({
        next: (auction) => {
          this.auction = auction;
        },
        error: (err) => console.error(err)
      });
    }
  }

  backToSellerPage() {
    this.router.navigate(['/app-seller', this.auction.seller.userid]);
  }

  saveChanges(): void {
    this.auctionService.updateAuction(this.auction.auctionid, this.auction).subscribe({
      next: (updatedAuction) => {
        this.auction = updatedAuction;
        alert('Auction updated successfully!');
        this.router.navigate(['app-seller', this.auction.seller.userid]);
      },
      error: (err) => {
        console.error('Error updating auction:', err);
        alert('Failed to update auction. Please try again.');
      }
    });
  }

  deleteAuction(): void {
    this.auctionService.deleteAuction(this.auction.auctionid).subscribe({
      next: () => {
        this.router.navigate(['app-seller', this.auction.seller.userid]);
      },
      error: (err) => {
        console.error('Error deleting auction:', err);
      }
    });
  }

  cancelEdit(): void {
    this.router.navigate(['app-seller', this.auction.seller.userid]);
  }
}
