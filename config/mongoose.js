const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Codial_development');
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting in database"));
db.once('open', function(){
    console.log("Connected Successfully");
})