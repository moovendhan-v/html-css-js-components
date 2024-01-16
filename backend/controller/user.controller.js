

// Configure Auth0 strategy in your server
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

passport.use(new Auth0Strategy({
   domain: '',
   clientID: '',
   clientSecret: '',
   callbackURL: ''
}, (accessToken, refreshToken, extraParams, profile, done) => {
   return done(null, profile);
}));

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());


const registerUser = ()=>{

}