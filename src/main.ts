import { platformBrowser } from '@angular/platform-browser';
import { setupStatusBar } from './global-statusbar';
import { AppModule } from './app/app.module';

setupStatusBar();
platformBrowser()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));
