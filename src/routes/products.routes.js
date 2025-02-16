import { Router } from "express";
import { prodController } from "../controllers/product.controller.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { passportCall } from "../middlewares/passportCall.middleware.js";

const router = Router();


router.get('/', prodController.getAllProducts); 

router.get('/:id', prodController.getProductById);

router.post('/', passportCall("jwt"), authorization("admin"), prodController.createProduct);

router.put('/:id', passportCall("jwt"), authorization("admin"), prodController.updateProduct);

router.delete('/:id', passportCall("jwt"), authorization("admin"), prodController.removeProduct);

export default router;