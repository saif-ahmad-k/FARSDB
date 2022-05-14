import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
declare var jquery: any;
declare var $: any;




//// UNCOMMENT if to disable production mode

//if (environment.production) {
//enableProdMode();
//}

platformBrowserDynamic().bootstrapModule(AppModule);


