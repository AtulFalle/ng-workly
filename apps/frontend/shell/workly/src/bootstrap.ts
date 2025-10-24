import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Import styles
import './index.scss';

bootstrapApplication(App, appConfig).catch((err) => {
  // Handle bootstrap error
  throw err;
});
