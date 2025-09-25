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
import { PlaceBidComponent } from './place-bid/place-bid.component';
import { ItemMapComponent } from './item-map/item-map.component';
import { EditAuctionComponent } from './edit-auction/edit-auction.component';
import { ReauctionComponent } from './reauction/reauction.component';
import { MessageComponent } from './message/message.component';

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
    path: 'app-admin',
    component: AdminComponent
  },
  {
    path: 'app-main-visitor/:userid',
    component: MainVisitorComponent
  },
  {
    path: 'app-visitor/:userid',
    component: VisitorComponent
  },
  {
    path: 'app-bidder/:userid',
    component: BidderComponent
  },
  {
    path: 'app-seller/:userid',
    component: SellerComponent
  },
  {
    path: 'app-create-auction/:userid',
    component: CreateAuctionComponent
  },
  {
    path: 'app-auction-details/:userid/:auctionid',
    component: AuctionDetailsComponent
  },
  {
    path: 'app-place-bid/:auctionid/:userid',
    component: PlaceBidComponent
  },
  {
    path: 'app-item-map/:location',
    component: ItemMapComponent
  },
  {
    path: 'app-edit-auction/:auctionid',
    component: EditAuctionComponent
  },
  {
    path: 'app-reauction/:userid',
    component: ReauctionComponent
  },
  {
    path: 'app-message/:userid/:auctionid',
    component: MessageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
