import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { AuctionService } from '../services/auction.service';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecommendationsService } from '../services/recommendations.service';
import { MessageService } from '../services/message.service';
import { Options } from '@angular-slider/ngx-slider';

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
  pageSize = 3;
  totalPages = 0;
  activeOnly: boolean = false;
  
  keyword = '';
  
  categories: any[] = [];
  selectedCategory = 'all';
  cities: string[] = [];
  selectedCity = 'all';
  locations: string[] = [];
  selectedLocation = 'all';
  countries: string[] = [];
  selectedCountry = 'all';

  minActivePrice!: number;  // Min bid on currently active auctions
  maxActivePrice!: number;  // Max bid on currently active auctions
  selectedMinPrice = 0;
  selectedMaxPrice = 10000;

  constructor(
    private route: ActivatedRoute,  // Extract userid of logged in user
    private router: Router,         // Navigate to other components
    private userService: UserService,   // Find user by userid
    private auctionService: AuctionService,   // Get all available auctions, locations, cities, countries
    private categoryService: CategoryService,   // Get all available categories
    private messageService: MessageService,     // Find the number of unread messages
    private recommendationsService: RecommendationsService    // Sort the auctions to be displayed based on interest for each user
  ) {}

  ngOnInit(): void {
    const userid = Number(this.route.snapshot.params['userid']);  // Extract the userid from the path
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

  /* ---------------------------------------------------------------------------------- */
  // Functions to find categories, locations, cities and countries of stored auctions

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

  /* ---------------------------------------------------------------------------------- */

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

    this.auctionService.getAuctionsFilteredOrderedByWeight(this.user.userid, this.selectedCategory, this.selectedLocation, 
      this.selectedCity, this.selectedCountry, this.selectedMinPrice, this.selectedMaxPrice, this.activeOnly, this.page, this.pageSize).subscribe(data => {
      this.auctions = data.content;
      this.totalPages = data.totalPages;
      this.displayUnreadMessages();
    });
  }


  /* ---------------------------------------------------------------------------------- */

  clearFilters(): void {
    this.keyword = '';
    this.selectedCategory = 'all';
    this.selectedLocation = 'all';
    this.selectedCity = 'all';
    this.selectedCountry = 'all';
    this.selectedMinPrice = this.minActivePrice;
    this.selectedMaxPrice = Math.min(500, this.maxActivePrice);
    this.activeOnly = false;
    this.loadAuctionsFilteredOrderedByWeight();
  }

  viewAuctionDetails(auctionid: number): void {
    this.recommendationsService.logInteraction(this.user.userid, auctionid, 'VIEW', 1.0);
    this.router.navigate(['app-auction-details', this.user.userid, auctionid]);
  }

  // Go to chat with the seller of the auction
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
}
