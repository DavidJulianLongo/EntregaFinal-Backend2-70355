import { Router } from "express";
import passport from "passport";
import { passportCall } from "../middlewares/passportCall.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { userDao } from "../dao/mongo/user.dao.js";
import { cartDao } from "../dao/mongo/cart.dao.js";
import { UserDTO } from "../dto/user.dto.js";
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
router.get("/current", passportCall("current"), authorization("user"), async (req, res) => {
    const user = new UserDTO(req.user);
    res.status(200).json({ status: "Success", user: user});
});


// Actualización de perfil de usuario
router.put("/current/update", passportCall("current"), async (req, res) => {
    try {
        const { first_name, last_name, email } = req.body;

        const user = await userDao.getById(req.user._id);

        // crea un objeto con los campos actualizados
        const updatedFields = {};
        if (first_name) updatedFields.first_name = first_name;
        if (last_name) updatedFields.last_name = last_name;
        if (email) updatedFields.email = email;

        // actualiza los campos solo si se proporcionan nuevos valores
        user.first_name = first_name || user.first_name;
        user.last_name = last_name || user.last_name;
        user.email = email || user.email;

        await userDao.update(user._id, user);

        res.status(200).json({ status: "Success", message: "User updated successfully", payload: updatedFields });
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Internal server error" });
    }
});

// Eliminar cuenta de usuario 
router.delete("/current/delete", passportCall("current"), async (req, res) => {
    try {
        // Verificar si el usuario existe antes de intentar eliminarlo
        const user = await userDao.getById(req.user._id);
        if (!user) return res.status(404).json({ status: "Error", message: "User not found" });
        // Elimina el carrito del usuario
        if (user.cart) await cartDao.deleteOne(user.cart);

        // Elimina el usuario de la base de datos
        await userDao.deleteOne(user._id);
        res.status(200).json({ status: "Success", message: "User account deleted successfully", paylod: { userId: user._id, userEmail: user.email } });

    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Internal server error" });
    }



});


export default router;