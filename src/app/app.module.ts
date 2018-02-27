import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {AgmCoreModule} from '@agm/core';
import {Geolocation} from "@ionic-native/geolocation";
import {Camera} from "@ionic-native/camera";

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {AddPlacePage} from "../pages/add-place/add-place";
import {PlacePage} from "../pages/place/place";
import {SetLocationPage} from "../pages/set-location/set-location";
// import {apiKey} from "../keys/apikey";
// import {Keys} from "../keys/keys";
import * as keys from '../keys/keys.json'
import {PlacesService} from "../services/places";

console.log('api key: %s', keys['googleMaps']);
@NgModule({
	declarations: [
		MyApp,
		HomePage,
		AddPlacePage,
		PlacePage,
		SetLocationPage
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		AgmCoreModule.forRoot({apiKey: keys['googleMaps'] })
	],
	bootstrap: [ IonicApp ],
	entryComponents: [
		MyApp,
		HomePage,
		AddPlacePage,
		PlacePage,
		SetLocationPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		Geolocation, // Talvez incluir somente no modules da página específica
		Camera,  // idem
		PlacesService,
		{provide: ErrorHandler, useClass: IonicErrorHandler}
	]
})
export class AppModule {
}
