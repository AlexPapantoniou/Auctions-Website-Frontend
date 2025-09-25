import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../services/auction.service';
import { MessageService } from '../services/message.service';
import { UserService } from './../services/user.service';
import { CreateMessageDTO } from '../model/createMessageDTO.model';
import { Message } from '../model/message.model';
import { User } from '../model/user.model';
import { Auction } from '../model/auction.model';

@Component({
  selector: 'app-message',
  standalone: false,
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  user!: User;
  auction!: Auction;
  messages: Message[] = [];
  newMessageContent: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private auctionService: AuctionService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const userid = Number(this.route.snapshot.params['userid']);
    if (userid) {
      this.userService.getUserById(userid).subscribe({
        next: (user) => {
          this.user = user;
        },
          error: (err) => console.log(err)
      });
    }
    const auctionid = Number(this.route.snapshot.params['auctionid']);
    if (auctionid) {
      this.auctionService.getAuctionById(auctionid).subscribe({
        next: (auction) => {
          this.auction = auction;
          this.loadMessages();
        },
          error: (err) => console.log(err)
      });
    }
  }

  loadMessages(): void {
    this.messageService.getMessagesByAuction(this.auction.auctionid).subscribe({
      next: (messages) => {
        this.messages = messages;

        messages.forEach(message => {
          if (message.receiver.userid === this.user.userid) {
            this.messageService.messageWasRead(message).subscribe({
              next: () => {},
              error: (err) => console.error(err)
            });
          }
        });
      },
      error: (err) => console.error(err)
    });
  }

  sendMessage(): void {
    if (!this.newMessageContent.trim()) {
      return;
    }

    const message: CreateMessageDTO = {
      sender: this.user,
      receiver: (this.user.userid === this.auction.seller.userid) ? this.auction.winner : this.auction.seller,
      auction: this.auction,
      content: this.newMessageContent,
      timestamp: new Date().toISOString(),
    };

    this.messageService.sendMessage(message).subscribe(savedMessage => {
      this.messages.push(savedMessage);
      this.newMessageContent = '';
      this.loadMessages();
    });
  }

  deleteMessage(messageid: number): void {
    if (confirm('Are you sure you want to delete this message?')) {
      this.messageService.deleteMessage(messageid).subscribe({
        next: () => {
          this.messages = this.messages.filter(m => m.messageid != messageid);
          this.loadMessages();
        },
        error: (err) => {
          console.error('Error deleting message: ' + err);
          alert('Error deleting message');
        }
      });
    }
  }
}
