import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ModalController} from "ionic-angular";
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../model/location";

@Component({
	selector: 'page-add-place',
	templateUrl: 'add-place.html',
})

export class AddPlacePage {

	location: Location = {
		lat: -23.5853114,
		lng: -46.6630912
	};

	marker: Location;

	locationIsSet: boolean = false;

	constructor(private modalCtrl: ModalController) {

	}

	onSubmit(form: NgForm) {
		console.log(form.value);
	}

	onOpenMap() {
		const modal = this.modalCtrl.create(SetLocationPage,
			{location: this.location, marker: this.marker});
		modal.present();
		modal.onDidDismiss((
			data => {
				if (data) {
					this.location = data.location;
					this.marker = data.location;
					this.locationIsSet = true;
				}
			}
		))

	}

}
