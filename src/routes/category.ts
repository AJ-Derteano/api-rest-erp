import { Router } from "express";
import { ControllerCategory } from "../controllers/Category";

const router = Router();

router.get("/", ControllerCategory.get);

router.get("/search", ControllerCategory.searchBy);

router.get("/:id", ControllerCategory.getById);

router.post("/", ControllerCategory.create);

router.put("/:id", ControllerCategory.update);

router.delete("/:id", ControllerCategory.delete);

export { router };
