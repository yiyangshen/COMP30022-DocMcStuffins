import passport from "passport";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import { User } from "../models";
import { compareSync } from "bcrypt";

// TODO : Decide on a password policy and email policy

/* Declare the custom fields for authentication lookup */
const customFields = {
    usernameField: "email",
    passwordField: "password"
};

/* Define the callback function to verify the authentication */
const verifyCallback: VerifyFunction = async (email, password, done) => {
    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            // User not found
            return done(null, false, { message: 'NOT_FOUND' });
        }
        // Check whether the password matches
        if (compareSync(password, user.password)) {
            return done(null, user, { message: 'SUCCESS' });
        }
        return done(null, false, { message: 'INCORRECT' });
    } catch (err) {
        return done(err);
    }
};

/* Apply the desired Local Strategy for passport */
passport.use(new LocalStrategy(customFields, verifyCallback));

/* Serialize the user on their id */
passport.serializeUser((user: any, done) => {
    done(null, user._id);
});

/* Deserialize the user on their id */
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

/* Local strategy for user registration */
passport.use('local-signup', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        try {
            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
                return done(null, false, { message: 'EXIST' });
            } else {
                const newUser = new User({
                    email: email.toLowerCase(),
                    password: password,
                    name: {
                        first: req.body.firstName,
                        middle: req.body.middleName,
                        last: req.body.lastName,
                    },
                });
                await newUser.save();
                return done(null, newUser, { message: 'SUCCESS' });
            }
        } catch (err) {
            return done(err);
        }

    }
))
