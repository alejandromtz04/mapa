import { Injectable } from "@angular/core";
import { AtracaderosInterface } from "../interfaces/map-markers.interface";
import { Atracaderos } from "../map/locations";

import leaflet from 'leaflet'

@Injectable({
    providedIn: 'root'
})

export class MapService {

    private map!: leaflet.Map;

    loadMap(id: string, center: leaflet.LatLngExpression, zoom: number = 17): void {
        this.map = leaflet.map(id).setView(center, zoom);

        leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
    }

    addMarkers(locations: AtracaderosInterface[]): void {
        if (!this.map) return;

        locations.forEach(location => {
            leaflet.marker([location.lat, location.lng])
                .addTo(this.map)
                .bindPopup(`<b>${location.atracadero}</b><br>${location.description}`);
        });

    }
}