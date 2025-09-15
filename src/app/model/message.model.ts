export interface message {
    messageid?: number;
    senderid: number;
    receiverid: number;
    auctionid?: number;
    content: string;
    timestamp?: Date;
    read?: boolean;
}