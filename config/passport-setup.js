const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.use(
  new GoogleStrategy(
    {
      //options for the google strategy
      callbackURL: '/auth/google/redirect',
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function fires AFTER exchanging code for profile info
      // check if user already exists in the DB
      User.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          //already have the user
          console.log(`user is ${currentUser}`);
        } else {
          // create new user in our DB
          new User({
            username: profile.displayName,
            googleId: profile.id
          })
            .save()
            .then(newUser => {
              console.log(`new user created: ${newUser}`);
            });
        }
      });
    }
  )
);
