import express from "express";
import {
  getVehicles,
  getVehicleById,
  addVehicle,
  updateVehicle,
  updateVehicleStatus,
  deleteVehicle,
  exportVehicles,
} from "../contollers/vehicleController.js";

const router = express.Router();

router.get("/", getVehicles);
router.get("/export", exportVehicles);
router.get("/:id", getVehicleById);
router.post("/", addVehicle);
router.put("/:id", updateVehicle);
router.put("/:id/status", updateVehicleStatus);
router.delete("/:id", deleteVehicle);

export default router;
