const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');
const PORT = 5645;
const app = express();
mongoose.Promise = global.Promise;

//cors manipulation
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS');

    res.setHeader('Access-Control-Expose-Headers','Authorization');
    
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    next();
    });


// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true, useUnifiedTopology: true 
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
// create express app

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.status(404).send('Error')
});

// listen for requests
require('./routes/user.routes')(app);
require('./routes/task.routes')(app);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});