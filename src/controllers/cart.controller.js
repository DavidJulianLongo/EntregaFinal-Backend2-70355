import { cartService } from '../services/cart.service.js';

class CartController {

    async addProdToCart(req, res, next) {
        try {
            const { cid, pid } = req.params;
            const updatedCart = await cartService.addProdToCart(cid, pid);
            res.json({
                status: "succes",
                message: `Product with ID: ${pid} added to cart`,
                payload: { cart: updatedCart }
            });
        } catch (error) {
            next(error);
        }
    }


    async getAll(req, res, next) {
        try {
            const carts = await cartService.getAllCarts();
            res.json({
                status: "Succes",
                payload: { carts: carts }
            });
        } catch (error) {
            next(error);
        }
    }

    async getCartById(req, res, next) {
        try {
            const { cid } = req.params;
            const cart = await cartService.getCartById(cid);
            res.json({
                status: "Succes",
                payload: { cart: cart }
            });
        } catch (error) {
            next(error);
        }
    }

    async updateProdQuantity(req, res, next) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const updatedCart = await cartService.addProdToCart(cid, pid, quantity);
            res.json({
                status: "Succes",
                message: 'Product quantity updated successfully',
                paylod: { cart: updatedCart }
            })
        } catch (error) {
            next(error)
        }
    }

    async updateCartProds(req, res, next) {
        try {
            const { cid } = req.params;
            const products = req.body;
            const updatedCart = await cartService.updateCartProds(cid, products);
            res.json({
                status: "Succes",
                message: 'Cart updated successfully',
                paylod: { cart: updatedCart }
            });
        } catch (error) {
            next(error);
        }
    }

    async removeProd(req, res, next) {
        try {
            const { cid, pid } = req.params;
            const deletedItem = await cartService.remove(cid, pid);
            res.json({
                status: "Succes",
                message: `Product with ID: ${pid} successfully removed`,
                payload: { cart: deletedItem }
            });
        } catch (error) {
            next(error)
        }
    }

    async removeAllProds(req, res, next) {
        try {
            const { cid } = req.params;
            const updatedCart = await cartService.removeAll(cid);
            res.json({
                status: "Succes",
                message: "The cart was successfully emptied",
                paylod: { cart: updatedCart }
            });
        } catch (error) {
            next(error);
        }
    }
}

export const cartController = new CartController();