import passport from "passport";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import { User } from "./models";

/* Declare the custom fields for authentication lookup */
const customFields = {
    usernameField: "email",
    passwordField: "password"
};

/* Define the callback function to verify the authentication */
const verifyCallback: VerifyFunction = async (email, password, done) => {
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            // User not found
            return done(null, false);
        }
        // Check whether the password matches (TODO: Apply bcrypt comparison here)
        return user.password === password ? done(null, user) : done(null, false);
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