const User = require('../models/user');

module.exports.signIn = function(req, res){
    return res.render('user_sign_in');
}
module.exports.signUp = function(req, res){
    return res.render('user_sign_up');
}

module.exports.createUser = function(req,res)
{
   if(req.body.password != req.body.confirm_password){
       return res.redirect('back');
   }

   User.findOne({email:req.body.email}, function(err,user){
       if(err){
           console.log("error in finding in signing up");
           return;
       }

        if(!user){
           User.create(req.body, function(err, user){
             if(err){

                console.log("error in creating in signing up");
                return;
             }  
             console.log(user);
             return res.redirect('/user/signIn'); 
           })
       }
       else{
        return res.redirect('back');
       }
   })
}