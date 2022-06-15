const express = require('express');
const route = express.Router();
const postController = require('../controllers/posts_controller');
const passport = require('passport');
route.post('/create',passport.checkAuthentication , postController.create);

module.exports = route;