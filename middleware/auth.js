//middleware that has access to the req and res objects
module.exports = {                 //remember you need next to call the next piece of middleware
    ensureAuth: function(req, res, next){
        if(req.isAuthenticated()) {
            return next()
        }else {
            res.redirect('/')
        }
    },
    ensureGuest: function(req, res, next){
        if(req.isAuthenticated()){
            res.redirect('/dashboard')
        }else{
            return next()
        }
    }
}