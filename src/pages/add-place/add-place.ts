import {Component} from '@angular/core';
import {LoadingController, ModalController, ToastController} from "ionic-angular";
import {NgForm} from "@angular/forms";
import {Geolocation} from '@ionic-native/geolocation';
import {Camera} from "@ionic-native/camera";
import {File, Entry, FileError} from '@ionic-native/file';

import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../model/location";
import {PlacesService} from "../../services/places";

declare var cordova: any;

@Component({
	selector: 'page-add-place',
	templateUrl: 'add-place.html',
})

export class AddPlacePage {

	marker: Location;
	locationIsSet: boolean = false;
	imageUrl = '';

	location: Location = {
		lat: -23.5853114,
		lng: -46.6630912
	};


	constructor(private modalCtrl: ModalController,
	            private geoCtrl: Geolocation,
	            private loadingCtrl: LoadingController,
	            private toastCtrl: ToastController,
	            private cameraCtrl: Camera,
	            private placesService: PlacesService,
	            private file: File) {

	}

	onSubmit(form: NgForm) {
		this.placesService.addPlace(
			form.value.title,
			form.value.description,
			this.location,
			this.imageUrl
		);

		form.reset();

		this.location = {
			lat: -23.5853114,
			lng: -46.6630912
		};

		this.imageUrl = '';
		this.locationIsSet = false;
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

	onTakePhoto() {
		this.cameraCtrl.getPicture({
			encodingType: this.cameraCtrl.EncodingType.JPEG,
			correctOrientation: true
		}).then(
			imageData => {

				const currentName = imageData.replace(/^.*[\\\/]/, '');
				const path = imageData.replace(/[^\/]*$/, '');
				const newFileName = new Date().getUTCMilliseconds() + '.jpg';

				this.file.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
					.then((data: Entry) => {
							this.imageUrl = data.nativeURL;
							this.cameraCtrl.cleanup();
						}
					).catch((err: FileError) => {
					this.imageUrl = '';
					const toast = this.toastCtrl.create({
						message: 'Could not save the image. Please try again',
						duration: 2500
					});

					toast.present();
					this.cameraCtrl.cleanup();
				});

				this.imageUrl = imageData
			}
		).catch(
			err => {
				const toast = this.toastCtrl.create({
					message: 'Could not save the image. Please try again',
					duration: 2500
				});
				toast.present();
			}
		)
	}
}
