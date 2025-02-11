import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { cookieExtractor } from "../../../utils/cookieExtractor.js";
import { userDao } from "../../../dao/mongo/user.dao.js";


export const jwt = new JwtStrategy({ jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), secretOrKey: process.env.JWT_SECRET }, async (jwt_paylod, done) => {
    try {
        const { email } = jwt_paylod;
        const user = await userDao.getByEmail(email);
        done(null, user);
    } catch (error) {
        done(error);
    }
});