import { Auction } from "./auction.mode";

export interface Item {
    itemid?: number;
    auction: Auction;
    name: string;
    categories: string[];
    buyprice: number;
    location: string;
    country: string;
    description: string;
}