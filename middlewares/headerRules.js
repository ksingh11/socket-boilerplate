"use strict";

var headerRules = function(req, res, next) {
    //CORS Header
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.methods == 'OPTIONS') {
        res.status(200).end();
    }
    else{
        next();
    }
};

module.exports = headerRules;