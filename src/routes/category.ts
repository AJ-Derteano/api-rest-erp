import { Router } from "express";
import { CategoryController } from "../controllers/Category";

const router = Router();

router.get("/", CategoryController.get);

router.get("/search", CategoryController.searchBy);

router.get("/:id", CategoryController.getById);

router.post("/", CategoryController.create);

router.put("/:id", CategoryController.update);

router.delete("/:id", CategoryController.delete);

export { router };
