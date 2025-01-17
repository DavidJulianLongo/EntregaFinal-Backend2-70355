import { Router } from "express";
import sessionsRouter from "./sessions.routes.js";

const router = Router();

router.use("/sessions", sessionsRouter);

export default router;