# Awesome Places

## Screennshot

![alt tag](https://raw.githubusercontent.com/DoctorRu/awesome-places/master/screenshots/01.jpg)
![alt tag](https://raw.githubusercontent.com/DoctorRu/awesome-places/master/screenshots/02.jpg)


### An Ionic 3 + Angular 5 mobile APP

<b>Notes:</b>

Here are the required adjustments for angular maps.

1) Install the agm package: <code>npm install --save @agm/core</code>

	1.5) Create the file <code>src/keys/keys.json</code> with:
<code>
{
	"googleMaps": "your google maps api key"
}
</code>


		Get a API key for Google maps<br>
		https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key

 

2) <code>import { AgmCoreModule } from '@agm/core'; 

3) Import + configure the SAME module (in <code>AppModule  imports[]</code> , add <code>AgmCoreModule.forRoot({...})</code>

4) Use component names:
<code> 
< agm-map ></code>  and  <code>< agm-marker ></code> <br>
(without space inside the tags)
<br>

<b>CSS styling is required!</b>

Setup the CSS file

Open the file src/app/app.component.css and paste the following content:<br>
<code>
agm-map {
  height: 300px;
}
</code>

It is really important that you define a height component `agm-map`. Otherwise, you won't see a map on the page!


<br><br>
Official docs:
https://angular-maps.com/guides/getting-started/