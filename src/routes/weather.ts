import express, { Router } from "express";
import { validateCache } from "../middlewares/cache/cacheMiddleware";
import { getWeatherData } from "../controllers/ExternalAPICaching/fetchAndCache";

const router: Router = express.Router();

router.get("/:city", validateCache, getWeatherData);

export default router;