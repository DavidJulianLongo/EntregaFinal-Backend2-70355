import { userService } from "../services/user.service.js";
import { userDao } from "../dao/mongo/user.dao.js";
import { checkCurrentPassword } from "../utils/hashPassword.js";


class UserController {

    async updateUser(req, res, next) {
        try {
            // Aseguramos que el usuario autenticado es el mismo que se intenta actualizar
            const userId = req.user._id;
            const { first_name, last_name, age, email } = req.body;

            // Validación solo si los campos están presentes
            const updateData = {};
            if (email) updateData.email = email;
            if (first_name) updateData.first_name = first_name;
            if (last_name) updateData.last_name = last_name;
            if (age) updateData.age = age;

            await userService.updateUser(userId, updateData);
            res.status(200).json({
                status: "Success",
                message: "User updated successfully",
                payload: updateData,
            });
        } catch (error) {
            next(error);
        }
    }


    async restorePassword(req, res, next) {
        try {
            const user = await userDao.getById(req.user._id);
            const { currentPassword, newPassword } = req.body;
            
             // Verificar si la contraseña actual es correcta
            await checkCurrentPassword(currentPassword, user);

            await userService.restorePassword(user._id, newPassword);
            res.status(200).json({
                status: "success",
                message: "Password updated successfully"
            });
        } catch (error) {
            next(error);
        }
    }


    async removeUser(req, res, next) {
        try {
            const userId = req.user._id;
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