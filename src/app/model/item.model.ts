import { Auction } from "./auction.model";

export interface Item {
    itemid?: number;
    auction: Auction;
    name: string;
    categories: string[];
    adderss: string;
    location: string;
    city: string;
    country: string;
    description: string;
}