import express, { Router } from "express";
import { notification } from "../controllers/websocket/realTime";

const router: Router = express.Router();

router.post('/',notification);
export default router;