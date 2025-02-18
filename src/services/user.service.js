import { userDao } from '../dao/mongo/user.dao.js';
import { CustomError } from '../utils/customError.js';
import { createHash } from "../utils/hashPassword.js";
import { isValidPassword } from "../utils/hashPassword.js";
import { cartDao } from '../dao/mongo/cart.dao.js';

class UserService {

    async updateUser(userId, updateData) {
        // Verificamos si hay datos para actualizar
        if (Object.keys(updateData).length === 0) {
            throw new CustomError("At least one field is required to update", 400);
        }

        // Obtenemos el usuario de la base de datos
        const user = await userDao.getById(userId);
        if (!user) throw new CustomError("User not found", 404);

        // Actualizamos solo los campos proporcionados en updateData
        if (updateData.email) user.email = updateData.email;
        if (updateData.first_name) user.first_name = updateData.first_name;
        if (updateData.last_name) user.last_name = updateData.last_name;
        if (updateData.age) user.age = updateData.age;

        const updatedUser = await userDao.update(user._id, user);
        return updatedUser;
    }


    async restorePassword(id, newPassword) {
        const user = await userDao.getById(id);
        if (!user) throw new CustomError("User not found", 404);
        
         // Hashear la nueva contraseña y actualizar en la DB
         const hashedPassword = createHash(newPassword);

        // Verificar que la nueva contraseña no sea igual a la anterior
        const isSamePassword = isValidPassword(newPassword, user);
        if (isSamePassword) throw new CustomError("New password cannot be the same as the old one", 400);
    
        return await userDao.update(user._id, { password: hashedPassword });
    
    }

    async removeUser(userId) {
        const user = await userDao.getById(userId);
        if (!user) throw new CustomError("User not found", 404);
    
        // Eliminar el carrito asociado si existe
        if (user.cart) {
            const cart = await cartDao.getById(user.cart);
            if (!cart) throw new CustomError("Cart not found", 404);

            await cartDao.remove(cart._id); // Elimina el carrito de la base de datos
        }
    
        // Eliminar el usuario
        await userDao.remove(user._id);
    }
}

export const userService = new UserService();