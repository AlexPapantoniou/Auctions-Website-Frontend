import { Auction } from "./auction.model";

export interface Item {
    itemid?: number;
    auction: Auction;
    name: string;
    categories: string[];
    location: string;
    country: string;
    description: string;
}