import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

import { User } from '../model/user.model';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  users: User[] = [];
  message: string = '';

  constructor(
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminService.getAllUsers().subscribe({
      next: (users) => this.users = users,
      error: (err) => console.error(err)
    });
  }

  acceptUser(userid: number): void {
    this.adminService.acceptUser(userid).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (err) => console.error(err)
    });
  }

  deleteUser(userid: number): void {
    this.adminService.deleteUser(userid).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (err) => console.error(err)
    });
  }

  downloadXml(): void {
    this.adminService.exportXml().subscribe(data => {
      const blob = new Blob([data], { type: 'application/xml' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'auction.xml';
      a.click();
    });
  }
}
