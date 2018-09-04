var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./models/user');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsmate = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var secret = require('./config/secret');
var app = express();

//managing middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secret.secretKey
}));
app.use(flash());


// managing viewengine
app.engine('ejs', ejsmate);
app.set('view engine', 'ejs');


// managing server
app.listen(3000, function (err) {
    if (err) {
        throw err;
    }
    console.log("server is running");
});


// managing database
mongoose.connect(secret.database, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("connected to database");
    }
});


// managing routes
var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');

app.use(mainRoutes);
app.use(userRoutes);