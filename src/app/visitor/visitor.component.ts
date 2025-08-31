import { Component } from '@angular/core';
import { AuctionService } from '../services/auction.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-visitor',
  standalone: false,
  templateUrl: './visitor.component.html',
  styleUrl: './visitor.component.css'
})
export class VisitorComponent {
  auctions: any[] = [];
  page = 0;
  size = 5;
  totalPages = 0;
  
  keyword = '';
  
  categories: any[] = [];
  selectedCategory = '';

  constructor(
    private auctionService: AuctionService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
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
}
