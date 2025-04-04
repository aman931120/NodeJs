// username and password stratergy
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');

passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    try {
        // done is a callback function used in passport.js
        // console.log("Received Credentials", USERNAME, password);
        const user = await Person.findOne({username:USERNAME});
        if(!user){
            return done(null, false, {message: 'Incorrect username.'});
        }

        const isPasswordMatch = await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null,user);
        }
        else{
            return done(null, false, { message: "Incorrect username." });
        }  
    } catch (error) {
        return done(error);
    }
}))

module.exports = passport ;