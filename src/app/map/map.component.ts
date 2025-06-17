import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { NgClass, NgFor } from '@angular/common';

import { Atracaderos } from './locations';
import { AtracaderosInterface } from '../interfaces/map-markers.interface';

import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';


@Component({
  selector: 'app-map',
  imports: [
    DataViewModule,
    ButtonModule,
    TagModule,
    NgFor
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit, AfterViewInit {

  atracaderosList!: AtracaderosInterface[];

  constructor(
    private readonly mapService: MapService
  ) { }

  ngOnInit(): void {
      this.mapService.getAtracaderos().subscribe({
        next: (data: AtracaderosInterface[]) => {
          this.atracaderosList = data.slice(0,9);
        },
        error: (err) => {
          console.error('Error handler fetching atracaderos: ', err);
        }
      });
  }

  ngAfterViewInit(): void {

    const center:[number, number] = [13.5749119, -89.8379314];

      this.mapService.loadMap('map', center, 17);
      this.mapService.addMarkers(Atracaderos as AtracaderosInterface[])
  }

  goToMarker(item: AtracaderosInterface) {
    this.mapService.setView(item.lat, item.lng, 17);
    this.mapService.openPopup(item.lat, item.lng)
  }

  getSeverity (atracadero: AtracaderosInterface) {
    switch (atracadero.disponibilidad) {
      case true:
        return 'success';
      case false: 
        return 'danger';
      default:
        return null;
    }
  };
 
}
