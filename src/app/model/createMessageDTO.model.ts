import { Auction } from "./auction.model";
import { User } from "./user.model";

// Message type without the id for creating the newly sent message
export interface CreateMessageDTO {
    sender: User;
    receiver: User;
    auction: Auction;
    content: string;
    timestamp: string;
}