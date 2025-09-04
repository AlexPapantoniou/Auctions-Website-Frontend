import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { AuctionService } from '../services/auction.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-seller',
  standalone: false,
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css'
})
export class SellerComponent {
  user: any;
  auctions: any[] = [];
  page = 0;
  size = 3;
  totalPages = 0;

  keyword = '';

  categories: any[] = [];
  selectedCategory = '';

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private auctionService: AuctionService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const userid = Number(this.route.snapshot.params['id']);
    if (userid) {
      this.userService.getUserById(userid).subscribe(data => {
        this.user = data;
      });
    }
    this.loadAuctions();
    this.loadCategories();
  }

  loadAuctions(): void {
    this.auctionService.getAllAuctions(this.page, this.size).subscribe(data => {
      this.auctions = data.content;
      this.totalPages = data.totalPages;
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  search(): void {
    if (this.keyword.trim() !== '') {
      this.auctionService.searchAuctions(this.keyword, this.page, this.size).subscribe(data => {
        this.auctions = data.content;
        this.totalPages = data.totalPages;
      });
    }
    else {
      this.loadAuctions();
    }
  }

  onCategoryChange(): void {
    if (this.selectedCategory) {
      this.auctionService.getAuctionsByCategory(this.selectedCategory, this.page, this.size).subscribe(data => {
        this.auctions = data.content;
        this.totalPages = data.totalPages;
      });
    }
    else {
      this.loadAuctions();
    }
  }

  viewAuctionDetails(auctionid: number): void {
    this.router.navigate(['/app-auction-details', auctionid]);
  }

  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadAuctions();
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.loadAuctions();
    }
  }

  createNewAuction() {
    this.router.navigate(['app-create-auction', this.user.userid]);
  }
}
