//
// APP.JS 
// HANDLED MOST APPLICATION SETUP.
//

const config = require('./config');

// NODE MODULES:
//
const path          = require('path');
const fs            = require('fs');

// EXPRESS.JS MODULES:
//
const express       = require('express');
const session       = require('express-session');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const multer        = require('multer');
const storage       = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, './my-uploads'); },
    filename: function (req, file, cb) { cb(null, file.fieldname + '-' + Date.now()); }
});
const upload        = multer({ dest: 'uploads/' });

const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if (isPhoto) {
            next(null, true);
        } else {
            next({ message: 'That filetype isn\'t allowed!' }, false);
        }
    }
};

// MONGODB MODULES:
//
const mongoose              = require('mongoose');
const MongoStore            = require('connect-mongo')(session);
const Schema                = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
mongoose.Promise            = global.Promise;

// PASSPORT.JS MODULES:
//
const passport      = require('passport');
const passportJWT   = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy   = require('passport-jwt').Strategy;
const ExtractJwt    = require('passport-jwt').ExtractJwt;
const jwt           = require('jsonwebtoken');

// MODELS:
// Included here for passport.createStrategy() below.
//
const Account = require('./models/account');

// CONTROLLERS:
//
const authenticate  = require('./controllers/authenticate');
const account       = require('./controllers/account');

const cors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin',  '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
};

// EXPRESS SETUP:
//
const app = express();
const api = require('./api');

const sessionConfig = {
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: false,
        secure: 'auto',
        maxAge: 60000
    }
};

// SET APP INSTANCE CONFIG:
//
app.set('title',        config.title);
app.set('json spaces',  4);
app.set('port',         config.server.port || 8080);

// TELL INSTANCE WHAT MIDDLEWARE TO USE:
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

// PASSPORT SETUP:
//
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret,
    tokenBodyField: 'token'
    // issuer: 'domain.com',
    // audience: 'domain.com'
};

passport.use(new JwtStrategy(options, authenticate.jwt));
passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// DO THESE THINGS BEFORE EVERY REQUEST IS PROCESSED:
//
app.use(cors);

// API ROUTING:
//
app.use('/api', api);

module.exports = app;
