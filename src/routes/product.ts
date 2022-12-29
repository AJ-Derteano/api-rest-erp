import { Router } from "express";
import { ProductController } from "../controllers/Product";

const router = Router();

router.get("/", ProductController.get);

router.get("/search", ProductController.searchBy);

router.get("/:id", ProductController.getById);

router.post("/", ProductController.create);

router.put("/:id", ProductController.update);

router.delete("/:id", ProductController.delete);

export { router };
