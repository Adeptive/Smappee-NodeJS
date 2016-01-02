var SmappeeAPI = require('./lib/smappee-api');

var smappee = new SmappeeAPI({
    ip: "0.0.0.0",
    debug: true,
    username: "admin",
    password: "admin"
});

module.exports = smappee;