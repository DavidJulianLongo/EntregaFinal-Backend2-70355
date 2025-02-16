import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { passportCall } from "../middlewares/passportCall.middleware.js";

const router = Router();

router.get('/', cartController.getAllCarts);

router.get('/:cid', cartController.getCartById);

router.post('/:cid/product/:pid', passportCall("jwt"), authorization("user"), cartController.addProdToCart);

router.put('/:cid/products/:pid', passportCall("jwt"), authorization("user"), cartController.updateProdQuantity);

router.put('/:cid/',passportCall("jwt"), authorization("user"), cartController.updateCartProds);

router.delete('/:cid/products/:pid',passportCall("jwt"), authorization("user"), cartController.removeProd);

router.delete('/:cid', passportCall("jwt"), authorization("user"), cartController.removeAllProds);

router.post('/:cid/purchase', passportCall("jwt"), authorization("user"), cartController.purchaseCart);



export default router;