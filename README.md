# Smappee-NodeJS
Smappee nodejs project to read smappee data.
Based on https://support.smappee.com/hc/en-us/articles/202153935-Where-can-I-find-the-API-documentation-

## Installation
```bash
npm install https://github.com/CONNCTED/Smappee-NodeJS --save
```

## Usage
### Create a new file 'my-smappee.js'
```javascript
var SmappeeAPI = require('smappee-nodejs');

var smappee = new SmappeeAPI({
    debug: false,

    clientId: "xxx",
    clientSecret: "xxx",

    username: "xxx",
    password: "xxx"
});

module.exports = smappee;
```

### In another nodejs file
```javascript
var smappee = require('./my-smappee');

smappee.getServiceLocations(function(output) {
    console.log(output);
})
```

The following functions are available: 
`getServiceLocations(callback)`, `getServiceLocationInfo(serviceLocationId, callback)`, ... 


