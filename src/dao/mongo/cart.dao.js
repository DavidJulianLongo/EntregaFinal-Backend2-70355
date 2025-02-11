import BaseDao from './base.dao.js';
import { cartModel } from './models/cart.model.js';



class CartDao extends BaseDao {
    constructor() {
        super(cartModel);
    }

    async getCartById(cartId) {
        return await cartModel.findById(cartId).populate('products.product');
    }

    async findOneAndUpdate(cartId, prodId, quantity) {
        return await cartModel.findOneAndUpdate(cartId, prodId, quantity);
    }

};

export const cartDao = new CartDao();