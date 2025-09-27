import { RecommendationsService } from './../services/recommendations.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { AuctionService } from '../services/auction.service';
import { CategoryService } from '../services/category.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-bidder',
  standalone: false,
  templateUrl: './bidder.component.html',
  styleUrl: './bidder.component.css'
})
export class BidderComponent {
  user: any;
  auctions: any[] = [];
  page = 0;
  size = 3;
  totalPages = 0;
  activeOnly: boolean = false;

  keyword = '';

  categories: any[] = [];
  selectedCategory = '';
  locations: string[] = [];
  selectedLocation = '';
  cities: string[] = [];
  selectedCity = '';
  countries: string[] = [];
  selectedCountry = '';

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private auctionService: AuctionService,
    private categoryService: CategoryService,
    private recommendationsService: RecommendationsService
  ) {}

  ngOnInit(): void {
    const userid = Number(this.route.snapshot.params['userid']);
    if (userid) {
      this.userService.getUserById(userid).subscribe({
        next: (user) => {
          this.user = user;
          this.loadAuctionsOrdered();
          this.loadCategories();
          this.loadLocations();
          this.loadCities();
          this.loadCountries();
        },
          error: (err) => console.error(err)
      });
    }
  }

  loadAuctionsOrdered(): void {
    this.auctionService.getAuctionsOrdered(this.user.userid, this.activeOnly, this.page, this.size).subscribe(data => {
      this.auctions = data.content;
      this.totalPages = data.totalPages;
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => this.categories = categories,
      error: (err) => console.error(err)
    });
  }

  loadLocations(): void {
    this.auctionService.getAllLocations().subscribe({
      next: (locations) => this.locations = locations,
      error: (err) => console.error(err)
    });
  }

  loadCities(): void {
    this.auctionService.getAllCities().subscribe({
      next: (cities) => this.cities = cities,
      error: (err) => console.error(err)
    });
  }

  loadCountries(): void {
    this.auctionService.getAllCountries().subscribe({
      next: (countries) => this.countries = countries,
      error: (err) => console.error(err)
    });
  }

  roleSelector(): void {
    this.router.navigate(['app-main-visitor', this.user.userid]);
  }

  search(): void {
    if (this.keyword.trim() !== '') {
      this.auctionService.searchAuctions(this.keyword, this.page, this.size).subscribe(data => {
        this.auctions = data.content;
        this.totalPages = data.totalPages;
      });
    }
    else {
      this.loadAuctionsOrdered();
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
      this.loadAuctionsOrdered();
    }
  }

  onLocationChange(): void {
    if (this.selectedLocation) {
      this.auctionService.getAuctionsByLocation(this.selectedLocation, this.page, this.size).subscribe(data => {
        this.auctions = data.content;
        this.totalPages = data.totalPages;
      });
    }
    else {
      this.loadAuctionsOrdered();
    }
  }

  onCityChange(): void {
    if (this.selectedCity) {
      this.auctionService.getAuctionsByCity(this.selectedCity, this.page, this.size).subscribe(data => {
        this.auctions = data.content;
        this.totalPages = data.totalPages;
      });
    }
    else {
      this.loadAuctionsOrdered();
    }
  }

  onCountryChange(): void {
    if (this.selectedCountry) {
      this.auctionService.getAuctionsByCountry(this.selectedCountry, this.page, this.size).subscribe(data => {
        this.auctions = data.content;
        this.totalPages = data.totalPages;
      });
    }
    else {
      this.loadAuctionsOrdered();
    }
  }

  viewAuctionDetails(auctionid: number): void {
    this.recommendationsService.logInteraction(this.user.userid, auctionid, 'VIEW', 1.0);
    this.router.navigate(['/app-auction-details', this.user.userid, auctionid]);
  }
  
  placeBid(auctionid: number): void {
    const auction = this.auctions.find(a => a.auctionid === auctionid);
    
    if (auction && !auction.active) {
      alert("You cannot place a bid on an inactive auction.");
      return;
    }
    
    this.router.navigate(['app-place-bid', auctionid, this.user.userid]);
  }

  clearFilters(): void {
    this.keyword = '';
    this.selectedCategory = '';
    this.selectedLocation = '';
    this.selectedCountry = '';
    this.activeOnly = false;
    this.loadAuctionsOrdered();
  }

  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadAuctionsOrdered();
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.loadAuctionsOrdered();
    }
  }
}
