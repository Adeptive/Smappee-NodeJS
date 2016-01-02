var http = require('http');

function SmappeeAPI(settings) {

    var TOKEN_API_URL = 'https://app1pub.smappee.net/dev/v1/oauth2/token';
    var SERVICE_LOCATION_API_URL = 'https://app1pub.smappee.net/dev/v1/servicelocation';
    var SERVICE_LOCATION_INFO_API_URL = 'https://app1pub.smappee.net/dev/v1/servicelocation/%s/info';
    var CONSUMPTION_API_URL = 'https://app1pub.smappee.net/dev/v1/servicelocation/%s/consumption';
    var EVENTS_API_URL = 'https://app1pub.smappee.net/dev/v1/servicelocation/%s/events';

    var ACTUATOR_ON_API_URL = 'https://app1pub.smappee.net/dev/v1/servicelocation/%s/actuator/%s/on';
    var ACTUATOR_OFF_API_URL = 'https://app1pub.smappee.net/dev/v1/servicelocation/%s/actuator/%s/off';


    var clientId = settings.clientId;
    var clientSecret = settings.clientSecret;
    var username = settings.username;
    var password = settings.password;

    var serviceLocationId = settings.serviceLocationId;
    var debug = settings.debug || false;

    var accessToken = undefined;

    this._getAccessToken = function() {
        if (typeof this.accessToken === undefined) {
            //TODO
        }
        return this.accessToken;
    }

}

module.exports = SmappeeAPI;