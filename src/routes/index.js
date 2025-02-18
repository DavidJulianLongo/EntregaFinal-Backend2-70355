import { Router } from "express";
import sessionRouter from "./session.routes.js";
import cartRouter from "./carts.routes.js";
import productRouter from "./products.routes.js";
import userRouter from "./user.routes.js";



const router = Router();

router.use("/sessions", sessionRouter);
router.use("/carts", cartRouter);
router.use("/products", productRouter);
router.use("/user", userRouter);


export default router;