import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

export const routes: Routes = [ 
  {
    path: '',
    redirectTo: 'app-welcome',
    pathMatch: 'full' 
  },
  {
    path: 'app-welcome',
    component: WelcomeComponent
  },
  {
    path: 'app-signup',
    component: SignupComponent
  },
  {
    path: 'app-waiting',
    component: WaitingComponent
  },
  {
    path: 'app-main-visitor/:id',
    component: MainVisitorComponent
  },
  {
    path: 'app-visitor/:id',
    component: VisitorComponent
  },
  {
    path: 'app-bidder/:id',
    component: BidderComponent
  },
  {
    path: 'app-seller/:id',
    component: SellerComponent
  },
  {
    path: 'app-admin',
    component: AdminComponent
  },
  {
    path: 'app-create-auction/:id',
    component: CreateAuctionComponent
  },
  {
    path: 'app-auction-details/:id',
    component: AuctionDetailsComponent
  }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
