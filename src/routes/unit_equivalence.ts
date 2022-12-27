import { Router } from "express";
import { ControllerUnitEquivalence } from "../controllers/UnitEquivalence";

const router = Router();

router.get("/", ControllerUnitEquivalence.get);

router.get("/search", ControllerUnitEquivalence.searchBy);

router.get("/conversion", ControllerUnitEquivalence.getConversion);

router.get("/:id", ControllerUnitEquivalence.getById);

router.post("/", ControllerUnitEquivalence.create);

router.put("/:id", ControllerUnitEquivalence.update);

router.delete("/:id", ControllerUnitEquivalence.delete);

export { router };
