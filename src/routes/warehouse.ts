import { Router } from "express";
import { WareHouseController } from "../controllers/WareHouse";

const router = Router();

router.get("/", WareHouseController.get);

router.get("/search", WareHouseController.searchBy);

router.get("/:id", WareHouseController.getById);

router.post("/", WareHouseController.create);

router.put("/:id", WareHouseController.update);

router.delete("/:id", WareHouseController.delete);

export { router };
