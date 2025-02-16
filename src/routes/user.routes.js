import {Router} from 'express';
import {userController} from '../controllers/user.controller.js';
import {passportCall} from '../middlewares/passportCall.middleware.js';

const router = Router();

// Actualización de perfil de usuario
router.put("/update", userController.updateUser);
console.log("req.user:", req.user);

// Restauración de contraseña
router.put("/restore-pass", passportCall("jwt"),authorization("user"), userController.restorePassword);

// Desactivación de usuario
router.delete("/delete", passportCall("jwt"), userController.deactivateUser);




export default router;  