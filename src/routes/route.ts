import e, { Router } from "express";
import {
  currencyName,
  distanceFromObelisco,
  normalizeAddress,
} from "../controller/controller";

export const router: e.Router = Router();

router.get("/distance-from-obelisco", distanceFromObelisco);
router.get("/normalize-address", normalizeAddress);
router.get("/currency-name", currencyName);
