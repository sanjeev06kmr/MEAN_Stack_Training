// Initilize DB
const mongoose = require('mongoose');
const assert = require('assert');

const db_url= process.env.DB_URL;

mongoose.connect(
    db_url,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
    },
    function(error, link){
        // Check Error.
        // If there is any error, 
        // Execution will stop at assert only other wise, it will proceed.
        assert.equal(error, null, "DB Connection Failed...");

        // Connection Established
        console.log("Connection Established...");
    }
    )