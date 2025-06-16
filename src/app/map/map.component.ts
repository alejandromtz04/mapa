import { Component, AfterViewInit } from '@angular/core';
import { MapService } from '../services/map.service';
import leaflet from 'leaflet'

import { Atracaderos } from './locations';
import { AtracaderosInterface } from '../interfaces/map-markers.interface';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit{

  constructor(private mapService: MapService) { }

  ngAfterViewInit(): void {

    const center:[number, number] = [13.5749119, -89.8379314];

      this.mapService.loadMap('map', center, 17);
      this.mapService.addMarkers(Atracaderos as AtracaderosInterface[])
  }

 
}
