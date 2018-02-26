import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Geolocation} from '@ionic-native/geolocation';
import {Camera} from "@ionic-native/camera";
import {LoadingController, ModalController, ToastController} from "ionic-angular";

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

	constructor(private modalCtrl: ModalController,
	            private geoCtrl: Geolocation,
	            private loadingCtrl: LoadingController,
	            private toastCtrl: ToastController,
	            private cameraCtrl: Camera) {

	}

	onSubmit(form: NgForm) {
		console.log(form.value);
	}

	onOpenMap() {
		const modal = this.modalCtrl.create(SetLocationPage,
			{location: this.location, marker: this.marker});
		modal.present();
		modal.onDidDismiss(
			data => {
				if (data) {
					this.location = data.location;
					this.marker = data.location;
					this.locationIsSet = true;
				}
			}
		)

	}

	onLocate() {
		const loader = this.loadingCtrl.create({content: 'Connecting to satellites'});
		loader.present();

		this.geoCtrl.getCurrentPosition()
			.then(
				location => {
					this.location.lat = location.coords.latitude;
					this.location.lng = location.coords.longitude;
					this.locationIsSet = true;
					console.log('location: %s, %s',
						location.coords.latitude,
						location.coords.longitude);
					loader.dismiss();
				}
			)
			.catch(
				error => {
					loader.dismiss();
					const toast = this.toastCtrl.create({
						message: 'Something is blocking your GPS transmission',
						duration: 2500,
						cssClass: "background-color: #CDEDCD"
					});
					toast.present();
				}
			)
	}

	onTakePhoto(){
		this.cameraCtrl.getPicture({
			encodingType: this.cameraCtrl.EncodingType.JPEG,
			correctOrientation: true
		}).then(
			imageData =>
				console.log(imageData)
		)
			.catch(
				err =>
					console.log(err)
			)

	}
}
