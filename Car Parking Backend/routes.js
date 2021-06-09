'use strict';


var path = require('path');

module.exports = function(app){

    // ANALYTICS USAGE

    app.use('/api/user', require('./api/user'));
    
    app.use('/api/location', require('./api/location'));

    app.use('/api/slots', require('./api/slots'));


    app.route('/*')
        .get(function(req, res) {
            // Commented path is for angular 6 build post production
            res.sendFile(path.resolve( __dirname + '/dist/App/index.html'));
            // res.sendFile(path.resolve( __dirname + '/index.html'));
        });

}
