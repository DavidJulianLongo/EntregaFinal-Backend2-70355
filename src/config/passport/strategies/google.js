import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { userDao } from "../../../dao/mongo/user.dao.js";
import { cartDao } from "../../../dao/mongo/cart.dao.js";


export const google = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_REDIRECT_URI,
    },
    async (accessToken, refreshToken, profile, cb) => {
        try {
            const { name, emails } = profile;
            const user = await userDao.getByEmail(emails[0].value);
            if (user) return cb(null, user);

            const newCart = await cartDao.create();

            const newUser = {
                first_name : name.givenName,
                last_name: name.familyName,
                email: emails[0].value,
                cart: newCart._id
            }

            const createUser = await userDao.create(newUser);
            return cb(null, createUser);
        } catch (error) {
            cb(error)
        }
    });