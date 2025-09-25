import { Auction } from "./auction.model";
import { User } from "./user.model";

export interface CreateMessageDTO {
    sender: User;
    receiver: User;
    auction: Auction;
    content: string;
    timestamp: string;
}