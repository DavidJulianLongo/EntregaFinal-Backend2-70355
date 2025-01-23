import { Strategy as LocalStrategy } from "passport-local";
import { userDao } from "../../../dao/mongo/user.dao.js";
import { createHash } from "../../../utils/hashPassword.js";
import { cartDao } from "../../../dao/mongo/cart.dao.js";


export const localRegister = new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
    try {
        const { first_name, last_name, age, role} = req.body;
        const user = await userDao.getByEmail(username);
        if (user) return done(null, false, { message: "User already exists" });

        // Valida que los campos no estén vacíos 
        if (
            !first_name?.trim() ||
            !last_name?.trim() ||
            !age?.toString().trim() ||
            !username?.trim() ||
            !password?.trim() 
            
        )  return done(null, false, { message: "All fields are required" });
    

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

        if (newUser.role === "admin") newUser.cart = undefined;
        const createUser = await userDao.create(newUser);

        return done(null, createUser);
    } catch (error) {
        done(error);
    }

});