const router = require('express').Router();
const passport = require('passport');

// login page
router.get('/login', (req, res) => {
  res.render('login');
});

// logout
router.get('/logout', (req, res) => {
  // handle with passport
  res.send('logging out');
});

//auth with google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // this fires AFTER the passport callback function
  // the user obj comes in the request as per passport.serialize/deserialize
  res.redirect('/profile');
});

module.exports = router;
