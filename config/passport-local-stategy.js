const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
        usernameField:'email'
    }, 
    function(email,password,done){
        //find user using email
        User.findOne({email:email}, function(err,user){
            if(err){
                console.log('err in finding user --> passport');
                return done(err);
            }

            if(!user || user.password != password){
                console.log('invalid username/password');
                return done(null,false);
            }

            return done(null,user);
        })
    }
));

// serialize the user
passport.serializeUser(function(user,done){
    done(null,user.id);
})

//deserialize the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('err in finding user --> passport');
            return done(err);
        }

        return done(null,user);
    });
});

//check if the user is authenticated
passport.checkAuthentication = function(req, res, next)
{
    //if the user is sign in
    if(req.isAuthenticated()){
        return next();
    }

    //if user is not sign in
    return res.redirect('/user/signin');


}

passport.setAuthenticatedUser = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        //req.user contains the signed in user from the session cookies and we are just sending this to the locals for the views.
        res.locals.user = req.user;
        console.log(res.locals.user);
    }
    next();
}

module.exports = passport;
