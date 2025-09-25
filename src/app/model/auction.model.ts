import { Item } from "./item.model";
import { User } from "./user.model";

export interface Auction {
    auctionid: number;
    item: Item;
    seller: User;
    firstBid: number;
    currentBid: number;
    buyPrice: number;
    numberOfBids: number;
    startTime: string;
    endTime: string;
    address: string;
    location: string;
    city: string;
    country: string;
    active: boolean;
    winner: User;
    unreadMessages?: number;
}