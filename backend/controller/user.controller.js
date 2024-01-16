

// Configure Auth0 strategy in your server
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

passport.use(new Auth0Strategy({
   domain: 'dev-bi3dwb0rmwcfgetf.au.auth0.com',
   clientID: 'iYsr1WWdUmG5jS1loOhF8DRPG0UdFGBq',
   clientSecret: 'l5BvRpAE_RuUUz1ZAT8UbM0tRx4gmNyyx76YcxcZVe3JBQ8NWYAMsrPIRt8sufgN',
   callbackURL: 'http://localhost:5173/callback'
}, (accessToken, refreshToken, extraParams, profile, done) => {
   return done(null, profile);
}));

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());


const registerUser = ()=>{

}