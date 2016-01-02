var smappee = require('../my-smappee');
var moment = require('moment');

var from = moment().subtract(1, 'year').utc().valueOf();
var to = moment().utc().valueOf();

smappee.debug = false;

smappee.getServiceLocations(function(output) {
    console.log(output);
    console.log("");

    var serviceLocationId = output.serviceLocations[0].serviceLocationId;
    console.log("Working with first serviceLocationId: " + serviceLocationId);
    console.log("");

    smappee.getServiceLocationInfo(serviceLocationId, function(output) {
        console.log('getServiceLocationInfo() -->');
        console.log(output);
        console.log("");
    });

    smappee.getConsumptions(serviceLocationId, smappee.AGGREGATION_TYPES.MONTHLY, from, to, function(output) {
        console.log('getConsumptions() -->');
        console.log(output);
        console.log("");
    });

    smappee.getLatestConsumption(serviceLocationId, function(output) {
        console.log('getLatestConsumption() -->');
        console.log(output);
        console.log("");
    });

    smappee.getEvents(serviceLocationId, "1", from, to, 10, function(output) {
        console.log('getEvents() -->');
        console.log(output);
        console.log("");
    });

    smappee.turnActuatorOn(serviceLocationId, 1, "300", function(output) {
        console.log('turnActuatorOn() -->');
        console.log(output);
        console.log("");
    });
});