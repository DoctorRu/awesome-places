import {Component} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";

import {Location} from "../../model/location";

@Component({
	selector: 'page-set-location',
	templateUrl: 'set-location.html',
})

export class SetLocationPage {
	location: Location;
	marker: Location;

	constructor(private navParams: NavParams,
	            private viewCtrl: ViewController) {
		this.location = this.navParams.get('location');
		this.marker = this.navParams.get('marker');
	}

	onSetMarker(event: any) {
		this.marker = new Location(event.coords.lat, event.coords.lng);
	}

	onConfirm() {
		this.viewCtrl.dismiss({location: this.marker})

	}

	onAbort() {
		this.viewCtrl.dismiss()
	}

}
