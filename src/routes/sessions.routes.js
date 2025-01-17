import { Router } from "express";
import passport from "passport";

const router = Router();


router.post("/register", passport.authenticate("register"), async (req, res) => {
    try {
        res.status(201).json({ status: "Success", payload: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Internal server error" })
    }
});

router.post("/login", passport.authenticate("login"), async (req, res) => {
    try {
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age
        }
        res.status(200).json({ status: "Success", payload: req.session.user });
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Internal server error" })
    }
});

router.get("/profile", async (req, res) => {
    try {
        if (!req.session.user) return res.status(401).json({ status: "Error", msg: "Please login" })
        res.status(200).json({ status: "Success", payload: req.session.user })
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Internal server error" });
    }
});


router.get("/google", passport.authenticate("google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ],
    session: false
}), async (req, res) => {
    res.status(200).json({ status: "Success", session: req.user });
});

export default router;