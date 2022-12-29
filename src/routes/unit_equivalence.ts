import { Router } from "express";
import { UnitEquivalenceController } from "../controllers/UnitEquivalence";

const router = Router();

router.get("/", UnitEquivalenceController.get);

router.get("/search", UnitEquivalenceController.searchBy);

router.get("/conversion", UnitEquivalenceController.getConversion);

router.get("/:id", UnitEquivalenceController.getById);

router.post("/", UnitEquivalenceController.create);

router.put("/:id", UnitEquivalenceController.update);

router.delete("/:id", UnitEquivalenceController.delete);

export { router };
