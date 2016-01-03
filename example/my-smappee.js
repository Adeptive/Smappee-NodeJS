var SmappeeAPI = require('smappee-nodejs');

var smappee = new SmappeeAPI({
    ip: "0.0.0.0",
    debug: true,

    clientId: "xxx",
    clientSecret: "xxx",

    username: "xxx",
    password: "xxx"
});

module.exports = smappee;