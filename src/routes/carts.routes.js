import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { passportCall } from "../middlewares/passportCall.middleware.js";

const router = Router();

router.get('/', cartController.getAllCarts);

router.get('/:cid', cartController.getCartById);

router.post('/:cid/product/:pid', passportCall("current"), authorization("user"), cartController.addProdToCart);

router.put('/:cid/products/:pid', passportCall("current"), authorization("user"), cartController.updateProdQuantity);

router.put('/:cid/',passportCall("current"), authorization("user"), cartController.updateCartProds);

router.delete('/:cid/products/:pid',passportCall("current"), authorization("user"), cartController.removeProd);

router.delete('/:cid',passportCall("current"), authorization("user"), cartController.removeAllProds);



export default router;