import { Injectable } from "@angular/core";
import { AtracaderosInterface } from "../interfaces/map-markers.interface";
import { Atracaderos } from "../map/locations";

import leaflet from 'leaflet'
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class MapService {

    private map!: leaflet.Map;
    private markers: leaflet.Marker[] = [];

    // Get Atracaderos list

    getAtracaderos(): Observable<AtracaderosInterface[]>{
        const atracaderos: AtracaderosInterface[] = Atracaderos;
        return of(atracaderos);
    }

    // Loads the map

    loadMap(id: string, center: leaflet.LatLngExpression, zoom: number = 17): void {
        this.map = leaflet.map(id).setView(center, zoom);

        leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
    }

    // Add Markers inside the map

    addMarkers(locations: AtracaderosInterface[]): void {
        if (!this.map) return;

        const iconMark = leaflet.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            iconSize: [32,48],
            iconAnchor: [16,32],
            popupAnchor: [0,-32]
        })

        locations.forEach(location => {
            leaflet.marker([location.lat, location.lng], { icon: iconMark })
                .addTo(this.map)
                .bindPopup(`<b>${location.atracadero}</b><br>${location.description}`);
        });
    }

    // Set view when i select atracadero from the list

    setView(lat: number, lng: number, zoom: number = 17): void {
        if (this.map) {
            this.map.setView([lat, lng], zoom);
        } else {
            console.warn('The map is not initialized');
        }
    }

    // open popup when select atracadero from the list

    openPopup(lat: number, lng: number) {
        const marker = this.markers.find( m => 
            m.getLatLng().lat === lat && m.getLatLng().lng === lng
        );

        if (marker) {
            marker.openPopup();
        }
    }
}