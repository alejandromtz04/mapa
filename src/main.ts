import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primeng/resources/primeng.min.css';
import 'primeng/resources/themes/lara-light-blue/theme.css';
import 'leaflet/dist/leaflet.css';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
