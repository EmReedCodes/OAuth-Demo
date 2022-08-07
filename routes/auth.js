
const express = require('express')
const passport = require('passport')
const router = express.Router()


//@desc Auth with google
//@route GET /auth/google
//error here
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

//@desc Google auth callback
//@route GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/'}), 
(req, res) => {
    res.redirect('/dashboard')
})

//@desc logout user
//@ route /auth/logout
//thank you mayanwolfe I saw your edit 
router.get('/logout', (req,res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
})


module.exports = router