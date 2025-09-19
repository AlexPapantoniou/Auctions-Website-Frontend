import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { AuctionService } from '../services/auction.service';
import { CategoryService } from '../services/category.service';
import { RecommendationsService } from '../services/recommendations.service';

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
    const userid = Number(this.route.snapshot.params['id']);
    if (userid) {
      this.userService.getUserById(userid).subscribe(data => {
        this.user = data;
      });
      this.loadAuctions();
      this.loadCategories();
      this.loadLocations();
      this.loadCities();
      this.loadCountries();
    }
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
      this.auctionService.getAuctionsByLocation(this.selectedLocation, this.page, this.size).subscribe(data => {
        this.auctions = data.content;
        this.totalPages = data.totalPages;
      });
    }
    else {
      this.loadAuctions();
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
      this.loadAuctions();
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
      this.loadAuctions();
    }
  }

  myAuctions(): void {
    if (this.user && this.user.userid) {
      this.auctionService.getAuctionsBySeller(this.user.userid, this.page, this.size).subscribe(data => {
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
    this.recommendationsService.logInteraction(this.user.userid, auctionid, 'VIEW', 1.0);
    this.router.navigate(['/app-auction-details', this.user.userid, auctionid]);
  }

  editAuction(auctionid: number): void {
    const auction = this.auctions.find(a => a.auctionid === auctionid);

    const currentDate: Date = new Date();
    const startDate = new Date(auction.startTime);

    if (!auction.active) {
      alert('You cannot edit an auction that is not currently active');
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
