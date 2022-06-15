const express = require('express');
const route = express.Router();
const passport = require('passport');
// const { Passport } = require('passport/lib');
const userController = require('../controllers/user_controller');

route.get('/signIn', userController.signIn );
route.get('/signup', userController.signUp);
route.post('/create', userController.createUser);
route.get('/profile',passport.checkAuthentication, userController.profile);
//use passport as middleware to authenticate user
route.post('/create-session', passport.authenticate('local',
{failureRedirect:'/user/signIn'}) ,userController.createSession)
route.get('/sign-out', userController.destroySession);
module.exports = route;