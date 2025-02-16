import { userService } from "../services/user.service.js";
import { userDao } from "../dao/mongo/user.dao.js";
import { isValidPassword } from "../utils/password.js";

class UserController {

    async updateUser(req, res) {
        try {
            const userId = req.user._id;
            const { first_name, last_name, age, email } = req.body;
            console.log(req.user);
            const updateData = { first_name, last_name, age, email };
            const updatedUser = await userService.updateUser(userId, updateData);

            res.status(200).json({
                status: "Success",
                message: "User updated successfully",
                payload: updatedUser,
            });
        } catch (error) {
            next(error);
        }
    }


    async restorePassword(req, res) {
        try {
            const { currentPassword, newPassword } = req.body;
            const user = await userDao.getById(req.user._id);

           
            // Verificar si la contraseña actual es válida usando el middleware
            const isMatch = isValidPassword(currentPassword, user);
            if (!isMatch) { return res.status(401).json({
                    status: "error",
                    message: "Incorrect current password",
                });
            }

            // Llamar al servicio para actualizar la contraseña
            await userService.restorePassword(email, newPassword);

            res.status(200).json({ status: "success", payload: message });
        } catch (error) {
            next(error);
        }
    }


    async deactivateUser(req, res, next) {
        try {
            const userId = req.user._id;

            // Llamamos al servicio para desactivar al usuario
            await userService.removeUser(userId);

            res.status(200).json({
                status: "Success",
                message: "Deleted user successfully",
            });
        } catch (error) {
            next(error);
        }
    }


}

export const userController = new UserController();