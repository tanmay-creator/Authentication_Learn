const express = require('express');
const route = express.Router();
const homeController = require('../controllers/home_controller');

route.get('/', homeController.home);
route.use('/user', require('./users'));
route.use('/posts',require('./posts'));


module.exports = route;