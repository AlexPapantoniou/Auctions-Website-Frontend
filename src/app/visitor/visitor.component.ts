import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { AuctionService } from '../services/auction.service';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-visitor',
  standalone: false,
  templateUrl: './visitor.component.html',
  styleUrl: './visitor.component.css'
})
export class VisitorComponent {
  user: any;
  auctions: any[] = [];
  page = 0;
  size = 3;
  totalPages = 0;
  
  keyword = '';
  
  categories: any[] = [];
  selectedCategory = '';
  locations: string[] = [];
  selectedLocation = '';
  countries: string[] = [];
  selectedCountry = '';

  constructor(
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
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  loadLocations(): void {
    this.auctionService.getAllLocations().subscribe(data => {
      this.locations = data;
    });
  }

  loadCountries(): void {
    this.auctionService.getAllCountries().subscribe(data => {
      this.countries = data;
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

  onLocationChange(): void {
    if (this.selectedLocation) {
      this.auctionService.getItemsByLocation(this.selectedLocation, this.page, this.size).subscribe(data => {
        this.auctions = data.content;
        this.totalPages = data.totalPages;
      });
    }
    else {
      this.loadAuctions();
    }
  }

  onCountryChange(): void {
    if (this.selectedCountry) {
      this.auctionService.getItemsByCountry(this.selectedCountry, this.page, this.size).subscribe(data => {
        this.auctions = data.content;
        this.totalPages = data.totalPages;
      });
    }
    else {
      this.loadAuctions();
    }
  }

  clearFilters(): void {
    this.keyword = '';
    this.selectedCategory = '';
    this.selectedLocation = '';
    this.selectedCountry = '';
    this.loadAuctions();
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
}
