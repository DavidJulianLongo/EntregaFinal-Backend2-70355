import passport from "passport";
import local from "passport-local";
import google from "passport-google-oauth20";
import { userDao } from "../dao/mongo/user.dao.js";
import { cartDao } from "../dao/mongo/cart.dao.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";


const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;

//funcion para inicializar passport
export const initializePassport = () => {

    //estrategia de registro local
    passport.use("register", new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {

        try {
            const { first_name, last_name, age, role } = req.body;
            const user = await userDao.getByEmail(username);
            if (user) return done(null, false, { message: "User already exists" });

            const newCart = await cartDao.create();

            const newUser = {
                first_name,
                last_name,
                email: username,
                age,
                password: createHash(password),
                role,
                cart: newCart._id
            }

            const createUser = await userDao.create(newUser);
            return done(null, createUser);

        } catch (error) {
            done(error)
        }
    }));


    //estrategia de login local
    passport.use("login", new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
        try {
            const user = await userDao.getByEmail(username);
            const validPass = isValidPassword(password, user);
            if (!user || !validPass) return done(null, false, { message: "Incorrect username or password" })

            done(null, user);
        } catch (error) {
            done(error)
        }
    }))


    //estrategia con google
    passport.use(new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_REDIRECT_URI
        },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                const { name, emails } = profile;
                const user = await userDao.getByEmail(emails[0].value);

                if (user) return cb(null, user);

                const newCart = await cartDao.create();
                const newUser = {
                    first_name: name.givenName,
                    last_name: name.familyName,
                    email: emails[0].value,
                    cart: newCart._id
                };

                const createUser = await userDao.create(newUser);
                return cb(null, createUser);
            } catch (error) {
                cb(error)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userDao.getById(id);
            done(null, user);
        } catch (error) {
            done(error)
        }
    });


};
