import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-item-map',
  standalone: false,
  templateUrl: './item-map.component.html',
  styleUrl: './item-map.component.css'
})
export class ItemMapComponent implements AfterViewInit {
  location: string = '';

  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
      this.route.paramMap.subscribe(params => {
        this.location = params.get('location') || '';

        if (this.location) {
          this.loadMap(this.location);
        }
      });
  }

  private async loadMap(location: string) {
    console.log('Query location:', location);
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location.toString())}`);
    const data = await response.json();

    if (data && data.length > 0) {
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);

      const map = L.map('map').setView([lat, lon], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);

      L.marker([lat, lon]).addTo(map)
        .bindPopup(`<b>${location}</b>`)
        .openPopup();
    }
  }
}
