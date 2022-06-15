// Git command to add repo in our project
// git remote add origin "https://github.com/tanmay-creator/Authentication_Learn.git";

//Requiring all the libraries
const express = require('express');
const PORT = 8000;
const app = express();
const express_ejs_layouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
//used for session cookie
const session = require('express-session')
const passport = require('passport');
const passportLocal = require('./config/passport-local-stategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}))


//to get data from post rrquest through url
app.use(express.urlencoded())

//Tell app to use cookie-parser
app.use(cookieParser());

//Tell express where to find static files.
app.use(express.static('./assets'));

//using express layouts
app.use(express_ejs_layouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts', true);



//Tell express which view is gonna be used.
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    secret:'somethingsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
     }
    ,
    store: MongoStore.create(
        {
            mongoUrl:'mongodb://localhost/Codial_development',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//Useing Routes
app.use('/', require('./routes/index'))

app.listen(PORT, function(err){
    if(err){
        console.log("Error in running the server");
        return;
    }

    console.log("Server is running...");
})