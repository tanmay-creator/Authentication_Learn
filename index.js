// Git command to add repo in our project
// git remote add origin "https://github.com/tanmay-creator/Authentication_Learn.git";

//Requiring all the libraries
const express = require('express');
const PORT = 8000;
const app = express();
const express_ejs_layouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');

//to get data from post rrquest through url
app.use(express.urlencoded())

//Tell app to use cookie-parser
app.use(cookieParser());

//Tell express where to find static files.
app.use(express.static('./assets'));

//Tell express which view is gonna be used.
app.set('view engine', 'ejs');
app.set('views', './views');

//using express layouts
app.use(express_ejs_layouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts', true);

//Useing Routes
app.use('/', require('./routes/index'))


app.listen(PORT, function(err){
    if(err){
        console.log("Error in running the server");
        return;
    }

    console.log("Server is running...");
})