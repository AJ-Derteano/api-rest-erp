import { Router } from "express";
import { ControllerProduct } from "../controllers/Product";

const router = Router();

router.get("/", ControllerProduct.get);

router.get("/search", ControllerProduct.searchBy);

router.get("/:id", ControllerProduct.getById);

router.post("/", ControllerProduct.create);

router.put("/:id", ControllerProduct.update);

router.delete("/:id", ControllerProduct.delete);

export { router };
