/**
 * Created by Roberto on 9/22/2015.
 */
// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var port = process.env.PORT || 8080;        // set our port

// SQL Server
var sql = require('mssql');

var config = {
    user: 'sql-username',
    password: 'sql-password',
    server: 'localhost',
    database: 'SqlDatabase'
}

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/users/:user', function(req, res) {
    res.type('application/json');
    res.json(require('./' + req.params.user + '.json'));
});

router.get('/clients/:clientId', function(req, res){
    res.type('application/json');

    var connection = new sql.Connection(config, function(err) {
        var request = new sql.Request(connection);
        request.input('clientId', sql.Int, req.params.clientId);
        request.query('SELECT * FROM Clientes WHERE clienteId = @clientId', function (err, recordset) {
            res.json(recordset);
        });
    });
});


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);