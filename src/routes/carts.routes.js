import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";

const router = Router();

router.get('/', cartController.getAll);

router.get('/:cid', cartController.getCartById);

router.post('/:cid/product/:pid', cartController.addProdToCart);

router.put('/:cid/products/:pid', cartController.updateProdQuantity);

router.put('/:cid/', cartController.updateCartProds);

router.delete('/:cid/products/:pid', cartController.removeProd);

router.delete('/:cid', cartController.removeAllProds);



export default router;