
Notes:



Here are the required adjustments for angular maps.

1) Install the agm package: <code>npm install --save @agm/core</code> 
2) <code>Import from '@agm/core'</code> 
3) Import + configure the SAME module (in <code>AppModule  imports[]</code> , add <code>AgmCoreModule.forRoot({...})</code>
4) Use component names:
<code> 
< agm-map ></code>  and  <code><agm-marker></code>
Official docs: https://angular-maps.com/guides/getting-started/