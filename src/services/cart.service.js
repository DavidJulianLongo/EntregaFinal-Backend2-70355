import { cartDao } from '../dao/mongo/cart.dao.js';
import { productDao } from "../dao/mongo/product.dao.js";
import { CustomError } from '../utils/customError.js';


class CartService {

    async getAllCarts() {
        try {
            return await cartDao.getAll();
        } catch (error) {
            throw error;
        }
    }

    async addProdToCart(cartId, prodId, quantity = 1) {
        try {
            const cart = await cartDao.getById(cartId);
            if (!cart) throw new CustomError(`Cart with ID: ${cartId} not found`, 404);
            const product = await productDao.getById(prodId);
            if (!product) throw new CustomError(`Product with ID: ${prodId} not found`, 404);

            // Verifica si el producto ya está en el carrito y si no está lo agrega
            const prodInCart = cart.products.find(p => p.product.toString() === prodId);

            // // Verifica si hay suficiente stock
            // const totalQuantity = prodInCart ? prodInCart.quantity + quantity : quantity;
            // if (product.stock < totalQuantity) {
            //     throw new CustomError(`Product with ID: ${prodId} does not have enough stock`, 400);
            // }

            // Agrega o actualiza la cantidad del producto en el carrito
            prodInCart ? prodInCart.quantity += quantity : cart.products.push({ product: prodId, quantity: quantity });

            // Guardar el carrito actualizado en la base de datos
            const updatedCart = await cartDao.update(cartId, { products: cart.products }, { new: true });
            if (!updatedCart) throw new CustomError("Failed to update cart", 500);
            return updatedCart;
        } catch (error) {
            throw error;
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await cartDao.getCartById(cartId);
            if (!cart) throw new CustomError(`Cart with ID: ${cartId} not found`, 404);
            return cart
        } catch (error) {
            throw error;
        }
    }

    async updateCartProds(cartId, products) {
        try {
            const cart = await cartDao.getById(cartId);
            if (!cart) throw new CustomError(`Cart with ID: ${cartId} not found`, 404);

            // Verifica si el formato de los productos es correcto (array de objetos con product y quantity)
            if (!Array.isArray(products) || products.some(p => !p.product || !p.quantity)) {
                throw new CustomError("Invalid products format", 400);
            }

            // Verifica si los productos existen y los agrega al carrito
            for (const prod of products) {
                const productExists = await productDao.getById(prod.product);
                if (!productExists) throw new CustomError(`Product with ID: ${prod.product} not found`, 404);

                await this.addProdToCart(cartId, prod.product, prod.quantity);
            }

            const updatedCart = await cartDao.getById(cartId);
            if (!updatedCart) throw new CustomError("Failed to update cart", 500);
            return updatedCart;
        } catch (error) {
            throw error;
        }
    }


    async removeProduct(cartId, productId) {
        try {
            const cart = await cartDao.getById(cartId);
            if (!cart) throw new CustomError(`Cart with ID: ${cartId} not found`, 404);

            const product = await productDao.getById(productId);
            if (!product) throw new CustomError(`Product with ID: ${productId} not found`, 404);

            // Verifica si el producto está en el carrito
            const productInCart = cart.products.find(p => p.product.toString() === productId);
            if (!productInCart) throw new CustomError(`Product with ID: ${productId} is not in the cart`, 400);

            // Elimina el producto del carrito
            cart.products = cart.products.filter(p => p.product.toString() !== productId)

            // Guardar el carrito actualizado en la base de datos
            const updatedCart = await cartDao.update(cartId, { products: cart.products }, { new: true });
            if (!updatedCart) throw new CustomError("Failed to update cart", 500);
            return updatedCart;
        } catch (error) {
            throw error;
        }
    }

    async removeAllProducts(cartId) {
        try {
            const cart = await cartDao.getById(cartId);
            if (!cart) throw new CustomError(`Cart with ID: ${cartId} not found`, 404);

            const updatedCart = await cartDao.update(cartId, { products: [] }, { new: true });
            return updatedCart;
        } catch (error) {
            throw error;
        }
    }

    // Método para realizar la compra de los productos del carrito y actualizar el stock
    async purchaseCart(cartId) {
        try {
            const cart = await cartDao.getById(cartId);
            if (!cart) throw new CustomError(`Cart with ID: ${cartId} not found`, 404);

            let total = 0;
            const prodWithoutStock = [];

            // Verificamos si todos los productos tienen stock suficiente
            for (const prod of cart.products) {
                const product = await productDao.getById(prod.product);
                if (!product) throw new CustomError(`Product with ID: ${prod.product} not found`, 404);

                if (product.stock < prod.quantity) prodWithoutStock.push(prod);
            }

            // Si hay productos sin stock, devolvemos los productos sin stock
            if (prodWithoutStock.length > 0) return prodWithoutStock;


            // Si todos los productos tienen stock suficiente, realizamos la compra
            for (const prod of cart.products) {
                const product = await productDao.getById(prod.product);
                total += product.price * prod.quantity;
                await productDao.update(prod.product, { stock: product.stock - prod.quantity });
            }

            // Vaciar el carrito después de la compra
            await cartDao.update(cartId, { products: [] }, { new: true });
            return total;

        } catch (error) {
            throw error;
        }

    }


}

export const cartService = new CartService()