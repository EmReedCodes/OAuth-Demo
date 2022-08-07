//this is for any route that isnt followed by something (top level)
const express = require('express')
const router = express.Router()
//destructuring                          go up one level..
const {ensureAuth, ensureGuest} = require('../middleware/auth')
//bringing in our model
const Story = require('../models/Story')

//@desc login/landing page
//@route GET / 
//should be ensureguest because only someone not logged in should be able to see this
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
})

//@desc dashboard
//@route GET / dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    //now get all stories that are our own
    try{
        const stories = await Story.find({ user: req.user.id }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            stories
        })
    } catch(err){
        console.error(err)
        res.render('error/500')
    }


})




module.exports = router