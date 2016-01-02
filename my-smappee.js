var SmappeeAPI = require('./lib/smappee-api');

var smappee = new SmappeeAPI({
    debug: true,

    clientId: "xxx",
    clientSecret: "xxx",

    username: "xxx",
    password: "xxx"
});

module.exports = smappee;