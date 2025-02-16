import { Router } from "express";
import userRouter from "./session.routes.js";
import cartRouter from "./carts.routes.js";
import productRouter from "./products.routes.js";



const router = Router();

router.use("/sessions", userRouter);
router.use("/carts", cartRouter);
router.use("/products", productRouter);
router.use("/user", productRouter);


export default router;