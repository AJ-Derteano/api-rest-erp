import { Router } from "express";
import { ControllerUnit } from "../controllers/unit";

const router = Router();

router.get("/", ControllerUnit.get);

router.get("/search", ControllerUnit.searchBy);

router.get("/:id", ControllerUnit.getById);

router.post("/", ControllerUnit.create);

router.put("/:id", ControllerUnit.update);

router.delete("/:id", ControllerUnit.delete);

export { router };
