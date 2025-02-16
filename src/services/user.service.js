import {userDao} from '../daos/user.dao.js';
import {CustomError} from '../utils/customError.js';
import { createHash } from "../utils/hash.js";

class UserService {

    async updateUser(userId, updateData) {
        const user = await userDao.getById(userId);
        if (!user) throw new CustomError("User not found", 404);

        // Actualizamos solo los campos que se pasen en updateData
        Object.keys(updateData).forEach(key => {
            if (updateData[key]) user[key] = updateData[key];
        });

        await userDao.update(user._id, user);
        return user;
    }

    async restorePassword(id, newPassword) {
        const user = await userDao.getById(id);
        if (!user) throw new CustomError("User not found", 404);

        const hashedPassword = createHash(newPassword);
        await userDao.update(user._id, { password: hashedPassword });
    }


    async removeUser(userId) {
        const user = await userDao.getById(userId);
        if (!user) throw new CustomError("User not found", 404);
        // Actualiza el campo 'active' a false para desactivar al usuario
        user.active = false;

        const cart = await cartDao.getById(user.cart);
        if (!cart) throw new CustomError("Cart not found", 404);
        // Actualiza el campo 'active' a false para desactivar el carrito
        cart.active = false;

        await userDao.update(user._id, user);
        await cartDao.update(cart._id, cart);
    }
}

export const userService = new UserService();