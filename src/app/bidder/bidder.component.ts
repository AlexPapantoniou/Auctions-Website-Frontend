import { RecommendationsService } from './../services/recommendations.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { AuctionService } from '../services/auction.service';
import { CategoryService } from '../services/category.service';
import { MessageService } from '../services/message.service';
import { UserAuctionInteraction } from '../model/userAuctionInteraction';
import { Auction } from '../model/auction.model';

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
  pageSize = 3;
  totalPages = 0;
  activeOnly: boolean = false;

  keyword = '';

  categories: any[] = [];
  selectedCategory = 'all';
  locations: string[] = [];
  selectedLocation = 'all';
  cities: string[] = [];
  selectedCity = 'all';
  countries: string[] = [];
  selectedCountry = 'all';

  minActivePrice!: number;  // Min bid on currently active auctions
  maxActivePrice!: number;  // Max bid on currently active auctions
  selectedMinPrice = 0;
  selectedMaxPrice = 10000;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private auctionService: AuctionService,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private recommendationsService: RecommendationsService
  ) {}

  ngOnInit(): void {
    const userid = Number(this.route.snapshot.params['userid']);
    if (userid) {
      this.userService.getUserById(userid).subscribe({
        next: (user) => {
          this.user = user;
          this.loadCategories();
          this.loadLocations();
          this.loadCities();
          this.loadCountries();
          this.loadMinActivePrice();
          this.loadMaxActivePrice();
          this.loadAuctionsFilteredOrderedByWeight();
        },
          error: (err) => console.error(err)
      });
    }
  }

  displayUnreadMessages(): void {
    this.auctions.forEach(auction => {
      this.messageService.getUnreadMessagesCount(auction.auctionid, this.user.userid).subscribe({
        next: (count) => {
          (auction as any).unreadMessages = count;
        },
        error: (err) => console.error(err)
      });
    });
  }

  // Load the available auctions filtered by possible filters used and ordered by user's interest
  loadAuctionsFilteredOrderedByWeight(): void {
    this.auctionService.getAuctionsFilteredOrderedByWeight(this.user.userid, this.selectedCategory, this.selectedLocation, 
      this.selectedCity, this.selectedCountry, this.selectedMinPrice, this.selectedMaxPrice, this.activeOnly, this.page, this.pageSize).subscribe(data => {
        this.auctions = data.content;
        this.totalPages = data.totalPages;
        this.displayUnreadMessages();
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

  loadMinActivePrice(): void {
    this.auctionService.getMinActivePrice().subscribe({
      next: (minActivePrice) => {
        this.minActivePrice = minActivePrice;
        this.selectedMinPrice = minActivePrice;
      },
      error: (err) => console.error(err)
    });
  }

  loadMaxActivePrice(): void {
    this.auctionService.getMaxActivePrice().subscribe({
      next: (maxActivePrice) => {
        this.maxActivePrice = maxActivePrice;
        this.selectedMaxPrice = maxActivePrice;
      },
      error: (err) => console.error(err)
    });
  }

  roleSelector(): void {
    this.router.navigate(['app-main-visitor', this.user.userid]);
  }

  /* ---------------------------------------------------------------------------------- */
  // Functions to find auctions based on search or filters used

  search(): void {
    if (this.keyword.trim() !== '') {
      this.auctionService.searchAuctions(this.user.userid, this.keyword, this.page, this.pageSize).subscribe(data => {
        this.auctions = data.content;
        this.totalPages = data.totalPages;
        this.displayUnreadMessages();
      });
    }
    else {
      this.loadAuctionsFilteredOrderedByWeight();
    }
  }

  onCategoryChange(): void {
    if (this.selectedCategory) {
      this.auctionService.getAuctionsFilteredOrderedByWeight(this.user.userid, this.selectedCategory, this.selectedLocation, 
      this.selectedCity, this.selectedCountry, this.selectedMinPrice, this.selectedMaxPrice, this.activeOnly, this.page, this.pageSize).subscribe(data => {
        this.auctions = data.content;
        this.totalPages = data.totalPages;
        this.displayUnreadMessages();
      });
    }
    else {
      this.loadAuctionsFilteredOrderedByWeight();
    }
  }

  onLocationChange(): void {
    if (this.selectedLocation) {
      this.auctionService.getAuctionsFilteredOrderedByWeight(this.user.userid, this.selectedCategory, this.selectedLocation, 
      this.selectedCity, this.selectedCountry, this.selectedMinPrice, this.selectedMaxPrice, this.activeOnly, this.page, this.pageSize).subscribe(data => {
        this.auctions = data.content;
        this.totalPages = data.totalPages;
        this.displayUnreadMessages();
      });
    }
    else {
      this.loadAuctionsFilteredOrderedByWeight();
    }
  }

  onCityChange(): void {
    if (this.selectedCity) {
      this.auctionService.getAuctionsFilteredOrderedByWeight(this.user.userid, this.selectedCategory, this.selectedLocation, 
      this.selectedCity, this.selectedCountry, this.selectedMinPrice, this.selectedMaxPrice, this.activeOnly, this.page, this.pageSize).subscribe(data => {
        this.auctions = data.content;
        this.totalPages = data.totalPages;
        this.displayUnreadMessages();
      });
    }
    else {
      this.loadAuctionsFilteredOrderedByWeight();
    }
  }

  onCountryChange(): void {
    if (this.selectedCountry) {
      this.auctionService.getAuctionsFilteredOrderedByWeight(this.user.userid, this.selectedCategory, this.selectedLocation, 
      this.selectedCity, this.selectedCountry, this.selectedMinPrice, this.selectedMaxPrice, this.activeOnly, this.page, this.pageSize).subscribe(data => {
        this.auctions = data.content;
        this.totalPages = data.totalPages;
        this.displayUnreadMessages();
      });
    }
    else {
      this.loadAuctionsFilteredOrderedByWeight();
    }
  }

  onPriceChange(): void {
    if (this.selectedMinPrice > this.selectedMaxPrice) {
      this.selectedMinPrice = this.selectedMaxPrice - 1;
    }

    if (this.selectedMinPrice < this.minActivePrice) {
      this.selectedMinPrice = this.minActivePrice;
    }

    if (this.selectedMaxPrice > this.maxActivePrice) {
      this.selectedMaxPrice = this.maxActivePrice;
    }

    this.auctionService.getAuctionsFilteredOrderedByWeight(this.user.userid, this.selectedCategory, this.selectedLocation, 
      this.selectedCity, this.selectedCountry, this.selectedMinPrice, this.selectedMaxPrice, this.activeOnly, this.page, this.pageSize).subscribe(data => {
      this.auctions = data.content;
      this.totalPages = data.totalPages;
      this.displayUnreadMessages();
    });
  }

  /* ---------------------------------------------------------------------------------- */

  viewAuctionDetails(auction: Auction): void {
    const uai: UserAuctionInteraction = {
      user: this.user,
      auction: auction,
      interactionType: 'VIEW',
      weight: 1.0
    };
    this.recommendationsService.logInteraction(uai).subscribe({
      next: () => {alert("Interaction logged")},
      error: () => {
        alert("Error logging interaction");
        return;
      }
    });
    this.router.navigate(['/app-auction-details', this.user.userid, auction.auctionid]);
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
    this.selectedCategory = 'all';
    this.selectedLocation = 'all';
    this.selectedCity = 'all';
    this.selectedCountry = 'all';
    this.selectedMinPrice = this.minActivePrice;
    this.selectedMaxPrice = Math.min(10000, this.maxActivePrice);
    this.activeOnly = false;
    this.loadAuctionsFilteredOrderedByWeight();
  }

  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadAuctionsFilteredOrderedByWeight();
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.loadAuctionsFilteredOrderedByWeight();
    }
  }
}
