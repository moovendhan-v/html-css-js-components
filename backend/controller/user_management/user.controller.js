
// TODO createing a user signup using auth0

// Configure Auth0 strategy in your server
import passport from 'passport';

import Auth0Strategy from 'passport-auth0';

passport.use(new Auth0Strategy({
   domain: '',
   clientID: '',
   clientSecret: '',
   callbackURL: ''
}, (accessToken, refreshToken, extraParams, profile, done) => done(null, profile)));

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

const registerUser = ()=>{

}