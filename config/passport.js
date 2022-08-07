const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')
//its going to my test collection figure out how to set a created collection 


module.exports = function(passport){
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    //profile what we need, done is the callback token when were done doing what we want to do
    async (accessToken, refreshToken, profile, done) => {
        const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value
        }
        //now store user
        try{
            let user = await User.findOne({ googleId: profile.id })
            //if that user exists
            if(user){
                done(null, user)
            }else{
                user = await User.create(newUser)
                done = (null, user)
            }
        }catch (err){
            console.error(err)
        }
    }
  )
 )

   // tried to updated this part min 48
    // passport.serializeUser((user, cb) => {
    //     process.nextTick(function() {
    //       return cb(null, user.id);
    //     });
    //   });
      
    //   passport.deserializeUser((id, cb) => {
    //     db.get('SELECT * FROM users WHERE id = ?', [ id ], function(err, user) {
    //       if (err) { return cb(err); }
    //       return cb(null, user);
    //     });
    //   });

    passport.serializeUser((user,done) => {
        done(null,user.id)
    });
    passport.deserializeUser((id,done) => {
        User.findById(id,(err, user) => {
            done(err, user)
        })
    })
}