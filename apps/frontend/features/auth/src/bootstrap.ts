import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { RemoteEntry } from './app/remote-entry/entry';

bootstrapApplication(RemoteEntry, appConfig).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
});
