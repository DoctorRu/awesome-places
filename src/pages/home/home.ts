import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AddPlacePage} from "../add-place/add-place";
import {Place} from "../../model/place";
import {PlacesService} from "../../services/places";

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	addPlacePage = AddPlacePage;
	places: Place[] = [];

	constructor(public navCtrl: NavController,
	            private placesService: PlacesService) {

	}

	ionViewWillEnter(){
		this.places = this.placesService.loadPlaces();
	}

}
