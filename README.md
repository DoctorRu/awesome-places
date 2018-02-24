
Notes:



Here are the required adjustments for angular maps.

1) Install the agm package: npm install --save @agm/core 
2) Import from '@agm/core' 
3) Import + configure the SAME module (in AppModule  imports[] , add AgmCoreModule.forRoot({...})
4) Use component names: <agm-map>  and  <agm-marker> 

Official docs: https://angular-maps.com/guides/getting-started/