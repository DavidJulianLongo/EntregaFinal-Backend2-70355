import { Router } from "express";
import { prodController } from "../controllers/product.controller.js";

const router = Router();


router.get('/', prodController.getAll); 

router.get('/:id', prodController.getById);

// router.post('/file', prodController.createFileProds);

router.post('/', prodController.create);

router.put('/:id', prodController.update);

router.delete('/:id', prodController.remove);

export default router;