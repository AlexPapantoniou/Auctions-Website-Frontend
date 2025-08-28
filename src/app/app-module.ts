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

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { HttpClientModule } from '@angular/common/http';

import { UserService } from './services/user.service';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})

export class AppModule { }