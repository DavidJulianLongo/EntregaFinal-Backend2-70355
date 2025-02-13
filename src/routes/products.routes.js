import { Router } from "express";
import { prodController } from "../controllers/product.controller.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { passportCall } from "../middlewares/passportCall.middleware.js";

const router = Router();


router.get('/', prodController.getAllProducts); 

router.get('/:id', prodController.getProductById);

router.post('/', passportCall("current"), authorization("admin"), prodController.createProduct);

router.put('/:id', passportCall("current"), authorization("admin"), prodController.updateProduct);

router.delete('/:id', passportCall("current"), authorization("admin"), prodController.removeProduct);

export default router;