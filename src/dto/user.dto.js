//Solamente trae el carrito si tiene algun productos
export class UserDTO {
    constructor(user) {
        this.name = user.first_name;
        this.lastName = user.last_name;
        this.email = user.email;
        this.cart = user.cart
        this.role = user.role;
    }
}