import { Auction } from "./auction.model";
import { User } from "./user.model";

export interface Message {
    messageid: number;
    sender: User;
    receiver: User;
    auction: Auction;
    content: string;
    timestamp: string;
}