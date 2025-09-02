import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuctionService } from '../services/auction.service';
import { UserService } from './../services/user.service';
import { CategoryService } from '../services/category.service';

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
    // private itemService: ItemService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const userid = Number(this.route.snapshot.params['id']);
    if (userid) {
      this.userService.getUserById(userid).subscribe(data => {
        this.user = data;
      });
    }
  }

  backToSellerPage() {
    this.router.navigate(['/app-seller', this.user.userid]);
  }

  onSubmit(): void {
    this.auctionService.addAuction(this.auction);
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
}
