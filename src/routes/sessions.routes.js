import { Router } from "express";
import passport from "passport";
import { generateToken, verifyToken } from "../utils/jwt.js";
import { passportCall } from "../middlewares/passportCall.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";


const router = Router();

//register
router.post("/register", passportCall("register"), async (req, res) => {
    try {
        res.status(201).json({ status: "Success", payload: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Internal server error" })
    }
});

// login
router.post("/login", passportCall("login"), async (req, res) => {
    try {
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role
        }

        const token = generateToken(req.user);
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ status: "Success", payload: req.session.user, token });
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Internal server error" })
    }
});

// profile
router.get("/profile", async (req, res) => {
    try {
        if (!req.session.user) return res.status(401).json({ status: "Error", msg: "Please login" })
        res.status(200).json({ status: "Success", payload: req.session.user })
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Internal server error" });
    }
});

// google auth
router.get("/google", passport.authenticate("google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ],
    session: false
}), async (req, res) => {
    try {
        const token = generateToken(req.user);
        res.status(200).json({ status: "Success", session: req.user, token });
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Internal server error" });
    }
});

// jwt y role
router.get("/current", passportCall("current"), authorization("admin"), async (req, res) => {
    res.status(200).json({ status: "Success", user: req.user }); 
});

export default router;