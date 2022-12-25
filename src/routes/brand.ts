import { Router } from "express";
import { ControllerBrand } from "../controllers/brand";

const router = Router();

router.get("/", ControllerBrand.get);

router.get("/search", ControllerBrand.searchBy);

router.get("/:id", ControllerBrand.getById);

router.post("/", ControllerBrand.create);

router.put("/:id", ControllerBrand.update);

router.delete("/:id", ControllerBrand.delete);

export { router };
