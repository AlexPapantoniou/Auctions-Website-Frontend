import 'zone.js';

// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app-routing-module'; // export your Routes array here
// import { importProvidersFrom } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(routes),             // ✅ Router provider
//     importProvidersFrom(HttpClientModule) // ✅ if you use HttpClient
//   ]
// })
// .catch(err => console.error(err));

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app-module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));