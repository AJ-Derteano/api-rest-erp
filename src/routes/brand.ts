import { Router } from "express";
import { BrandController } from "../controllers/Brand";

const router = Router();

router.get("/", BrandController.get);

router.get("/search", BrandController.searchBy);

router.get("/:id", BrandController.getById);

router.post("/", BrandController.create);

router.put("/:id", BrandController.update);

router.delete("/:id", BrandController.delete);

export { router };
