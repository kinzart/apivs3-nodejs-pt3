const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();



// App
const app = express();
app.use(express.json()); //use json
app.use(express.urlencoded({extended: true}));//force json
// Database
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: true,
     useCreateIndex: true
});

const db = mongoose.connection;
  
db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
        'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});


// Load Models
const Order = require('./models/order');


// Load routes
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);


const orderRoutes = require('./routes/order-routes');
app.use('/order', orderRoutes);

module.exports = app;
