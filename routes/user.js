const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');

//IT REQUIRE SESSION TO BE ENABLED
const csrfProtection = csrf();
router.use(csrfProtection); // ALL THE ROUTE WITH ROUTER SHOULD BE PROTECTED WITH CSRF PROTECTION


// SHOW THE DASHBOARD OR USER PROFILE
//BY USING ISLOGGEDIN ONLY THOSE CAN ACCESS PROFILE PAGE WHO HAVE LOGED IN
router.get('/profile', isLoggedIn, (req, res, next) => {
    res.render('user/profile');
});



router.get('/logout', isLoggedIn , (req, res, next)=>{
    req.logout();
    res.redirect('/');
});



// BY USING THIS FILTER IN FRONT OF ALL ROUTES CHECKING USER IS NOT LOGED IN
router.use('/', notLoggedIn, (req, res, next)=>{
    next();
})






//SIGNUP
router.get('/signup', (req, res, next) => {
    // FLASH MESSAGE WILL BE STORE UNDER error
    let messages = req.flash("error");
    res.render('user/signup', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});
// REQUESTING FOR SIGNUP
//LOCAL.SHIGNUP THIS IS INDICATING THE STRATEGY WE MADE IN PASSPORT.JS FILE
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));
















//SIGN IN
router.get('/signin', (req, res, next) => {
    // FLASH MESSAGE WILL BE STORE UNDER error
    let messages = req.flash("error");
    res.render('user/signin', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});
router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));


















module.exports = router;


// THIS FUNCTION IS FOR CHECKING LOGED IN OR NOT
// checking login or not
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        return next(); //CONTINUE
    }
    res.redirect('/');
}
function notLoggedIn(req, res, next){
    if (!req.isAuthenticated()) {
        return next(); //CONTINUE
    }
    res.redirect('/');
}