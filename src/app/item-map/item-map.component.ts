import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-item-map',
  standalone: false,
  templateUrl: './item-map.component.html',
  styleUrl: './item-map.component.css'
})
export class ItemMapComponent {
  private map: any;

  contructor() {};

  ngOnInit(): void {
    this.configMap();
  }

  configMap(): void {
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }
}
