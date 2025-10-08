import { Auction } from "./auction.model";
import { User } from "./user.model";

export interface UserAuctionInteraction {
    user: User;
    auction: Auction;
    interactionType: string;
    weight: number;
}