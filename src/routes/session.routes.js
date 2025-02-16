import { Router } from "express";
import passport from "passport";
import { passportCall } from "../middlewares/passportCall.middleware.js";
import { sessionController } from "../controllers/sessions.controller.js";


const router = Router();

//Registro de usuario 
router.post("/register", passportCall("register"), sessionController.register);

// Login de usuario 
router.post("/login", passportCall("login"), sessionController.login);

// google auth
router.get("/google", passport.authenticate("google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ],
    session: false
}), sessionController.google);

// Obtener usuario actual
router.get("/current", passportCall("jwt"), sessionController.currentUser);

// Cerrar sesión de usuario
router.delete("/logout", passportCall("jwt"), sessionController.logout);



export default router;