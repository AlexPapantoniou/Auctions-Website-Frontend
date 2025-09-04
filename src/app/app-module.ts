import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './signup/signup.component';
import { WaitingComponent } from './waiting/waiting.component';
import { MainVisitorComponent } from './main-visitor/main-visitor.component';
import { VisitorComponent } from './visitor/visitor.component';
import { BidderComponent } from './bidder/bidder.component';
import { SellerComponent } from './seller/seller.component';
import { AdminComponent } from './admin/admin.component';
import { CreateAuctionComponent } from './create-auction/create-auction.component';
import { AuctionDetailsComponent } from './auction-details/auction-details.component';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { HttpClientModule } from '@angular/common/http';

import { UserService } from './services/user.service';
import { AdminService } from './services/admin.service';
import { AuctionService } from './services/auction.service';
import { ItemService } from './services/item.service';
import { PlaceBidComponent } from './place-bid/place-bid.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SignupComponent,
    WaitingComponent,
    MainVisitorComponent,
    VisitorComponent,
    BidderComponent,
    SellerComponent,
    AdminComponent,
    AuctionDetailsComponent,
    CreateAuctionComponent,
    PlaceBidComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService, AdminService, AuctionService, ItemService],
  bootstrap: [AppComponent]
})

export class AppModule { }