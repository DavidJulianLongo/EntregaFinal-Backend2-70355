import { Strategy as LocalStrategy } from "passport-local";
import { userDao } from "../../../dao/mongo/user.dao.js";
import { isValidPassword } from "../../../utils/hashPassword.js";


export const localLogin = new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
    try {
        const user = await userDao.getByEmail(username);
        if (!user || !isValidPassword(password, user)) return done(null, false, { message: "Incorrect username or password" });
        done(null, user);
    } catch (error) {
        done(error);
    }
})