require('dotenv').config();
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
const database = require('./database');

const port = process.env.PORT;

app.use(bodyParser.json());

// Setting up CORS setting.
// While running via Postman this may not be required.
// But while integrating it with UI, we need to enable the origin.
// Otherwise , UI may not be able to access REST API 
// as both will running on different port.
app.use((req, res, next)=>{
    // Currently allowing request from all sites. 
    // Can change if required to put restrictions.
    res.header('Access-Control-Allow-Origin', '*');

    // Currently allowing access for all headers.
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization')

    // Currently allowing access for all HTTP verbs.
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')

    // Go to Next Middleware.
    next();
});


// Setting routers to Customer module based on URL.
app.use('/customer/', require('./routes/customer'));
// image route to serve image uploaded by user while creating Customer.
// through this route, imageURL will bound to img src. 
app.use('/image', express.static(__dirname+'/uploads'));

//If none of the APIs from above routes serves the request, 
//It will go to below middleware to handle 404 or other error.
app.use((req, res, next)=>{
    console.log("404");
    const error = new Error('Resourse Not Found!!');
    error.status = 404
    next(error);
});

app.use((err, req, res, next)=>{
    console.log("Error Occured");
    res.status(err.status || 500);
    res.send({
        error : err.message
    })
});

app.listen(port, function(){console.log("Starting Server at "+port);});

module.exports = app;