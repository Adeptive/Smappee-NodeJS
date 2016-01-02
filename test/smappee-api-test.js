var smappee = require('../my-smappee');
var moment = require('moment');


/*smappee.getServiceLocations(function(output) {
    console.log(output);
});

smappee.getServiceLocationInfo("8039", function(output) {
    console.log(output);
});*/

/*var from = moment().subtract(1, 'year').utc().valueOf();
var to = moment().utc().valueOf();

smappee.getConsumptions("8039", smappee.AGGREGATION_TYPES.MONTHLY, from, to, function(output) {
    //console.log(output);
});*/

/*smappee.getLatestConsumption("8039", function(output) {
    console.log(output);
});*/


/*var from = moment().subtract(1, 'year').utc().valueOf();
 var to = moment().utc().valueOf();

 smappee.getEvents("8039", "1", from, to, 10, function(output) {
 //console.log(output);
 });*/

smappee.turnActuatorOn("8039", "1", "300", function(output) {
    console.log(output);
});