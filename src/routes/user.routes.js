import {Router} from 'express';
import {userController} from '../controllers/user.controller.js';
import {passportCall} from '../middlewares/passportCall.middleware.js';
import {authorization} from '../middlewares/authorization.middleware.js';

const router = Router();

// Actualización de perfil de usuario
router.put("/update", passportCall("jwt"), authorization("user"), userController.updateUser);

// Restauración de contraseña
router.put("/restore-pass", passportCall("jwt"), authorization("user"), userController.restorePassword);

// Eliminar un usuario de usuario
router.delete("/delete", passportCall("jwt"), authorization("user"), userController.removeUser);




export default router;  