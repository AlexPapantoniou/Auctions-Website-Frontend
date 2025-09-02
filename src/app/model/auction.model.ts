import { Item } from "./item.model";

export interface Auction {
    auctionid: number;
    item: Item;
    sellerId?: number;
    firstBid: number;
    currentBid: number;
    buyPrice: number;
    numberOfBids: number;
    startTime: string;
    endTime: string;
}