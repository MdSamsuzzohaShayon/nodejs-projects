//SETUP PASSPORT AND STRATEGY
const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;









//THIS WILL TELL THE PASSPORT HOW TO STORE USER IN THE SESSION
passport.serializeUser((user, done) => {
    //STORE USER IN SESSION SERILIZE BY ID
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
});














//CREATE STRATEGY FOR SIGN UP
passport.use('local.signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    //THIS FUNCTION WILL USE IN THE ROUTE METHOD AS CALLBACK
    (req, email, password, done) => {
        // VLIDATING WITH EXPRESS VALIDATOR
        req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
        req.checkBody('password', 'Invalid password').notEmpty().isLength({
            min: 4
        });
        let errors = req.validationErrors();
        if (errors) {
            let messages = [];
            errors.forEach((error) => {
                messages.push(error.msg);
            });
            return done(null, false, req.flash('error', messages));
        }
        User.findOne({
                'email': email
            },
            // CHECKING THE EMAIL IS ALREADY REGISTER OR NOT
            (err, user) => {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, false, {
                        message: "Email is already in use"
                    });
                }
                let newUser = new User();
                newUser.email = email;
                // ENCRYPT PASSWORD METHODS IS COMING FROM USER MODELS
                newUser.password = newUser.encryptPassword(password);

                //SAVING USER TO DATABASE
                newUser.save((err, result) => {
                    if (err) {
                        return done(err);
                    }
                    return done(null, newUser);
                });

            }
        );
    }));


















    

//CREATE STRATEGY FOR SIGN IN
passport.use('local.signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        //DOING THE VALIDATION AGAIN
        req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
        req.checkBody('password', 'Invalid password').notEmpty();
        let errors = req.validationErrors();
        if (errors) {
            let messages = [];
            errors.forEach((error) => {
                messages.push(error.msg);
            });
            return done(null, false, req.flash('error', messages));
        }



        User.findOne({'email': email}, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: "No user found" });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, {message: "Wrong password"});
                }
                return done(null, user) ;
            });
}));