import { Auction } from "./auction.model";

export interface Item {
    itemid?: number;
    auction: Auction;
    name: string;
    categories: string[];
    description: string;
}