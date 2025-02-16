import passport from "passport";
import { localRegister } from "./strategies/localRegister.js";
import { localLogin } from "./strategies/localLogin.js";
import { google } from "./strategies/google.js";
import { jwt } from "./strategies/jwt.js";
import { userDao } from "../../dao/mongo/user.dao.js";


// Función para inicializar Passport
export const initializePassport = () => {

    passport.use("register", localRegister);
    passport.use("login", localLogin);
    passport.use(google);
    passport.use("jwt", jwt);

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
} 