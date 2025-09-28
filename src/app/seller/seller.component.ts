import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { AuctionService } from '../services/auction.service';
import { CategoryService } from '../services/category.service';
import { RecommendationsService } from '../services/recommendations.service';
import { MessageService } from '../services/message.service';

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
  selectedMinPrice: number = 0;
  selectedMaxPrice: number = 10000;

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

    this.auctionService.getAuctionsFilteredOrderedByWeight(this.user.userid, this.selectedCategory, this.selectedLocation, 
      this.selectedCity, this.selectedCountry, this.selectedMinPrice, this.selectedMaxPrice, this.activeOnly, this.page, this.pageSize).subscribe(data => {
      this.auctions = data.content;
      this.totalPages = data.totalPages;
      this.displayUnreadMessages();
    });
  }

  myAuctions(): void {
    if (this.user && this.user.userid) {
      this.auctionService.getAuctionsBySeller(this.user.userid, this.page, this.pageSize).subscribe(data => {
        this.auctions = data.content;
        this.totalPages = data.totalPages;
        this.displayUnreadMessages();
      });
    }
    else {
      this.loadAuctionsFilteredOrderedByWeight();
    }
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
  
  viewAuctionDetails(auctionid: number): void {
    this.recommendationsService.logInteraction(this.user.userid, auctionid, 'VIEW', 1.0);
    this.router.navigate(['/app-auction-details', this.user.userid, auctionid]);
  }

  editAuction(auctionid: number): void {
    const auction = this.auctions.find(a => a.auctionid === auctionid);

    const currentDate: Date = new Date();
    const startDate = new Date(auction.startTime);
    const endDate = new Date(auction.endTime);
    
    if (endDate <= currentDate) {
      alert('You cannot edit an auction that has already ended');
      return;
    }

    if ((startDate.getTime() <= currentDate.getTime()) && (auction.numberOfBids > 0)) {
      alert('You cannot edit an auction that has already started and has bids.');
      return;
    }

    this.router.navigate(['app-edit-auction', auctionid]);
  }

  goToChat(auctionid: number): void {
    this.router.navigate(['app-message', this.user.userid, auctionid]);
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

  createNewAuction() {
    this.router.navigate(['app-create-auction', this.user.userid]);
  }
}
