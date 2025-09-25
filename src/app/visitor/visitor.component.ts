import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { AuctionService } from '../services/auction.service';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecommendationsService } from '../services/recommendations.service';
import { MessageService } from '../services/message.service';

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
  selectedCategory = '';
  cities: string[] = [];
  selectedCity = '';
  locations: string[] = [];
  selectedLocation = '';
  countries: string[] = [];
  selectedCountry = '';

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

  // Load the available auctions ordered by user's interest
  loadAuctionsOrdered(): void {
    this.auctionService.getAuctionsOrdered(this.user.userid, this.activeOnly, this.page, this.pageSize).subscribe(data => {
      this.auctions = data.content;
      this.totalPages = data.totalPages;

      this.auctions.forEach(auction => {
        this.messageService.getUnreadMessagesCount(auction.auctionid, this.user.userid).subscribe({
          next: (count) => {
            (auction as any).unreadMessages = count;
          },
          error: (err) => console.error(err)
        });
      });
    });
  }

  /* ---------------------------------------------------------------------------------- */
  // Functions to find categories, locations, cities and countries of stored auctions

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

  loadCities(): void {
    this.auctionService.getAllCities().subscribe(data => {
      this.cities = data;
    });
  }

  loadCountries(): void {
    this.auctionService.getAllCountries().subscribe(data => {
      this.countries = data;
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
      this.auctionService.searchAuctions(this.keyword, this.page, this.pageSize).subscribe(data => {
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
      this.auctionService.getAuctionsByCategory(this.selectedCategory, this.page, this.pageSize).subscribe(data => {
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
      this.auctionService.getAuctionsByLocation(this.selectedLocation, this.page, this.pageSize).subscribe(data => {
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
      this.auctionService.getAuctionsByCity(this.selectedCity, this.page, this.pageSize).subscribe(data => {
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
      this.auctionService.getAuctionsByCountry(this.selectedCountry, this.page, this.pageSize).subscribe(data => {
        this.auctions = data.content;
        this.totalPages = data.totalPages;
      });
    }
    else {
      this.loadAuctionsOrdered();
    }
  }

  /* ---------------------------------------------------------------------------------- */

  clearFilters(): void {
    this.keyword = '';
    this.selectedCategory = '';
    this.selectedLocation = '';
    this.selectedCountry = '';
    this.activeOnly = false;
    this.loadAuctionsOrdered();
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
