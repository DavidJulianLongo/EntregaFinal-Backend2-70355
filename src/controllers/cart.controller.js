import { cartService } from '../services/cart.service.js';
import { ticketService } from '../services/ticket.service.js';

class CartController {

    async addProdToCart(req, res, next) {
        try {
            const { cid, pid } = req.params;
            const updatedCart = await cartService.addProdToCart(cid, pid);
            res.status(200).json({
                status: "success",
                message: "Product added to cart",
                payload: { cart: updatedCart }
            });
        } catch (error) {
            next(error);
        }
    }


    async getAllCarts(req, res, next) {
        try {
            const carts = await cartService.getAllCarts();
            res.status(200).json({
                status: "Success",
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
            res.status(200).json({
                status: "Success",
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
            res.status(200).json({
                status: "Success",
                message: 'Product quantity updated successfully',
                payload: { cart: updatedCart }
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
            res.status(200).json({
                status: "Success",
                message: 'Cart updated successfully',
                payload: { cart: updatedCart }
            });
        } catch (error) {
            next(error);
        }
    }

    async removeProd(req, res, next) {
        try {
            const { cid, pid } = req.params;
            const deletedItem = await cartService.removeProduct(cid, pid);
            res.status(200).json({
                status: "Success",
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
            const updatedCart = await cartService.removeAllProducts(cid);
            res.status(200).json({
                status: "Success",
                message: "The cart was successfully emptied",
                payload: { cart: updatedCart }
            });
        } catch (error) {
            next(error);
        }
    }

    async purchaseCart(req, res, next) {
        try {
            const { cid } = req.params;
            const cart = await cartService.getCartById(cid);
            if (cart.products.length === 0) {
                return res.status(400).json({
                    status: 'error',
                    message: 'The cart is empty and cannot be purchased'
                });
            }
            
            const result = await cartService.purchaseCart(cid);

            if (Array.isArray(result) && result.length > 0) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Some products do not have enough stock and cannot be purchased',
                    Products: result
                });
            }
        
            const ticket = await ticketService.createTicket(result, req.user.email);
            res.status(200).json({
                status: "Success",
                message: "Purchase completed successfully",
                payload: { ticket: ticket }
            });
        } catch (error) {
            next(error);
        }
    }

}

export const cartController = new CartController();