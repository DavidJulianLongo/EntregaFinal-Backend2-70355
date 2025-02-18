import bcrypt from "bcrypt";

// Función que hashea la contraseña
export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

// Función que compara contraseña
export const isValidPassword = (password, user) => {
    return bcrypt.compareSync(password, user.password);
}   

export const checkCurrentPassword = (currentPassword, user) => {
    // Verificar si la contraseña actual coincide con la almacenada
    const isMatch = bcrypt.compareSync(currentPassword, user.password);
    if (!isMatch) {
        throw new Error('Current password is incorrect');
    }
    return true;
};