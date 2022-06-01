const express = require('express');
const route = express.Router();
const userController = require('../controllers/user_controller');
route.get('/signIn', userController.signIn );
route.get('/signup', userController.signUp);
route.post('/create', userController.createUser);
module.exports = route;