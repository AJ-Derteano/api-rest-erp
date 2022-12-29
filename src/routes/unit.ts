import { Router } from "express";
import { UnitController } from "../controllers/Unit";

const router = Router();

router.get("/", UnitController.get);

router.get("/search", UnitController.searchBy);

router.get("/:id", UnitController.getById);

router.post("/", UnitController.create);

router.put("/:id", UnitController.update);

router.delete("/:id", UnitController.delete);

export { router };
