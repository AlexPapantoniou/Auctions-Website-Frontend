import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../services/auction.service';
import { MessageService } from '../services/message.service';
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
  auction!: Auction;
  messages: Message[] = [];
  newMessageContent: string = '';
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private auctionService: AuctionService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const userid = Number(this.route.snapshot.params['userid']);
    if (userid) {
      this.userService.getUserById(userid).subscribe(data => {
        this.user = data;
      });
    }
    const auctionid = Number(this.route.snapshot.params['auctionid']);
    if (auctionid) {
      this.auctionService.getAuctionById(auctionid).subscribe(data => {
        this.auction = data;
        this.loadMessages();
      });
    }
  }

  loadMessages(): void {
    this.messageService.getMessagesByAuction(this.auction.auctionid).subscribe(data => {
      this.messages = data;
    });
  }

  sendMessage(): void {
    if (!this.newMessageContent.trim()) {
      return;
    }

    const message: Message = {
      messageid: 0,
      sender: this.user,
      auction: this.auction,
      content: this.newMessageContent,
      timestamp: new Date().toISOString(),
      read: false
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
