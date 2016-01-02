var http = require('http');
var request = require('request');
var querystring = require('querystring');
var moment = require('moment');

function SmappeeAPI(settings) {

    var clientId = settings.clientId;
    var clientSecret = settings.clientSecret;
    var username = settings.username;
    var password = settings.password;

    var debug = settings.debug || false;

    var accessToken = undefined;

    this.AGGREGATION_TYPES = {
        MINUTES: 1,
        HOURLY: 2,
        DAILY: 3,
        MONTHLY: 4,
        QUARTERLY: 5
    };

    // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++

    /**
     * Get a list of all houses/installations on this account.
     *
     * See https://smappee.atlassian.net/wiki/display/DEVAPI/Get+Servicelocations
     *
     * @param handler           function that will be called when request is completed.
     */
    this.getServiceLocations = function(handler) {
        _get('https://app1pub.smappee.net/dev/v1/servicelocation', {}, handler);
    };

    /**
     * Get the details about 1 service location (list of appliances, list of actuators, ...).
     *
     * See https://smappee.atlassian.net/wiki/display/DEVAPI/Get+Servicelocation+Info
     *
     * @param serviceLocationId     one of the ids from the getServiceLocations() request.
     * @param handler               function that will be called when request is completed.
     */
    this.getServiceLocationInfo = function(serviceLocationId, handler) {
        var url = 'https://app1pub.smappee.net/dev/v1/servicelocation/' + serviceLocationId + '/info';
        _get(url, {}, handler);
    };

    /**
     * Get a list of all consumptions for the specified period and interval.
     *
     * see https://smappee.atlassian.net/wiki/display/DEVAPI/Get+Consumption
     *
     * @param serviceLocationId     serviceLocationId one of the ids from the getServiceLocations() request.
     * @param aggregation           one of the AGGREGATION TYPES to specify the periodically of the consumptions to return.
     * @param from                  date in UTC milliseconds to start from
     * @param to                    date in UTC milliseconds to end with
     * @param handler               function that will be called when request is completed.
     */
    this.getConsumptions = function(serviceLocationId, aggregation, from, to, handler) {
        var url = 'https://app1pub.smappee.net/dev/v1/servicelocation/' + serviceLocationId + '/consumption';
        var fields = {
            aggregation: aggregation,
            from: from,
            to: to
        };
        _get(url, fields, handler);
    };

    this.getLatestConsumption = function(serviceLocationId, handler) {
        var url = 'https://app1pub.smappee.net/dev/v1/servicelocation/' + serviceLocationId + '/consumption';
        var fields = {
            aggregation: this.AGGREGATION_TYPES.MINUTES,
            from: moment().subtract(30, 'minutes').utc().valueOf(),
            to: moment().add(30, 'minutes').utc().valueOf()
        };
        _get(url, fields, function(output) {
            if (output.consumptions.length > 0) {
                handler(output.consumptions[output.consumptions.length - 1]);
            } else {
                handler(undefined);
            }
        });
    };

    this.getMonthlyConsumptionsForLastYear = function(serviceLocationId, handler) {
        var url = 'https://app1pub.smappee.net/dev/v1/servicelocation/' + serviceLocationId + '/consumption';
        var fields = {
            aggregation: this.AGGREGATION_TYPES.MONTHLY,
            from: moment().subtract(1, 'year').utc().valueOf(),
            to: moment().utc().valueOf()
        };
        _get(url, fields, handler);
    };

    this.getEvents = function(serviceLocationId, applianceId, from, to, maxNumber, handler) {
        var url = 'https://app1pub.smappee.net/dev/v1/servicelocation/' + serviceLocationId + '/events';
        var fields = {
            applienceId: applianceId,
            from: from,
            to: to,
            maxNumber: maxNumber || 10
        };
        _get(url, fields, handler);
    };

    /*this.turnActuatorOn = function(serviceLocationId, actuatorId, duration, handler) {
        var url = 'https://app1pub.smappee.net/dev/v1/servicelocation/' + serviceLocationId + '/actuator/' + actuatorId + '/on';
        var fields = {
            duration: duration
        };
        _post(url, fields, handler);
    };

    this.turnActuatorOff = function(serviceLocationId, actuatorId, duration, handler) {
        var url = 'https://app1pub.smappee.net/dev/v1/servicelocation/' + serviceLocationId + '/actuator/' + actuatorId + '/off';
        var fields = {
            duration: duration
        };
        _post(url, fields, handler);
    };*/


    // HELPER METHODS ++++++++++++++++++++++++++++++++++++++++

    var _getAccessToken = function(handler) {
        if (typeof accessToken == 'undefined') {
            var body = {
                client_id: clientId,
                client_secret: clientSecret,
                username: username,
                password: password,
                grant_type: 'password'
            };

            if (debug) {
                var query = querystring.stringify(body);
                console.log("Making oAuth call...");
            }

            var options =  {
                url: 'https://app1pub.smappee.net/dev/v1/oauth2/token',
                headers: {
                    'Host': 'app1pub.smappee.net'
                },
                form: body
            };

            request.post(options, function (err, httpResponse, body) {
                if (err) {
                    return console.error('Request failed:', err);
                }
                if (debug) {
                    console.log('Server responded with:', body);
                }

                accessToken = JSON.parse(body);
                handler(accessToken);
            });
        } else {
            handler(accessToken)
        }
    };

    var _post = function(url, fields, handler) {
        _getAccessToken(function(accessToken) {
            if (debug) {
                var query = querystring.stringify(fields);
                console.log("Request to " + url);
                console.log("With parameters: " + query);
            }

            var options =  {
                url: url,
                headers: {
                    'Authorization': 'Bearer ' + accessToken.access_token
                },
                form: fields
            };

            request.post(options, function (err, httpResponse, body) {
                if (err) {
                    return console.error('Request failed:', err);
                }
                if (debug) {
                    console.log('Server responded with:', body);
                }

                var output = JSON.parse(body);
                handler(output);
            }); //end of POST request
        }); //end of access token request
    };

    var _get = function(url, fields, handler) {
        _getAccessToken(function(accessToken) {
            var query = querystring.stringify(fields);
            if (debug) {
                console.log("Request to " + url);
                console.log("With parameters: " + query);
            }

            var options =  {
                url: url + "?" + query,
                headers: {
                    'Authorization': 'Bearer ' + accessToken.access_token
                }
            };

            request.get(options, function (err, httpResponse, body) {
                if (err) {
                    return console.error('Request failed:', err);
                }
                if (debug) {
                    console.log('Server responded with:', body);
                }

                var output = JSON.parse(body);
                handler(output);
            });   //end of GET request
        }); //end of access token request
    };

}

module.exports = SmappeeAPI;