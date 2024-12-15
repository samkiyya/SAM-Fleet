import Vehicle from "../models/vehicleModel.js";
import { Parser } from "json2csv";
import ExcelJS from "exceljs";
import mongoose from "mongoose";

export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getVehicleById = async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addVehicle = async (req, res) => {
  const vehicle = req.body;
  const newVehicle = new Vehicle(vehicle);

  try {
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateVehicle = async (req, res) => {
  const { id } = req.params;
  const updatedVehicle = req.body;

  // Check if the id is a valid MongoDB ObjectId
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid vehicle ID" });
  }

  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      id,
      { ...updatedVehicle, lastUpdated: new Date() },
      { new: true }
    );
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateVehicleStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      id,
      { status, lastUpdated: new Date() },
      { new: true }
    );
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteVehicle = async (req, res) => {
  const { id } = req.params;
  console.log("Received ID to delete:", id); // In backend

  try {
    const vehicle = await Vehicle.findByIdAndDelete(id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const exportVehicles = async (req, res) => {
  const { format } = req.query;

  try {
    const vehicles = await Vehicle.find();

    if (format === "csv") {
      const fields = [
        { label: "ID", value: "_id" },
        { label: "Name", value: "name" },
        { label: "Type", value: "type" },
        { label: "License Plate", value: "licensePlate" },
        { label: "Driver", value: "driver" },
        { label: "Mileage", value: "mileage" },
        { label: "Fuel Level", value: "fuelLevel" },
        { label: "Status", value: "status" },
        {
          label: "Last Updated",
          value: (row) => row.lastUpdated?.toISOString(),
        },
      ];

      const parser = new Parser({ fields });
      const csv = parser.parse(vehicles);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=vehicles.csv");
      return res.status(200).send(csv);
    } else if (format === "xlsx") {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Vehicles");

      worksheet.columns = [
        { header: "ID", key: "id", width: 10 },
        { header: "Name", key: "name", width: 20 },
        { header: "Type", key: "type", width: 15 },
        { header: "License Plate", key: "licensePlate", width: 15 },
        { header: "Driver", key: "driver", width: 20 },
        { header: "Mileage", key: "mileage", width: 10 },
        { header: "Fuel Level", key: "fuelLevel", width: 10 },
        { header: "Status", key: "status", width: 15 },
        { header: "Last Updated", key: "lastUpdated", width: 20 },
      ];

      vehicles.forEach((vehicle) => {
        worksheet.addRow({
          ...vehicle.toObject(),
          lastUpdated: vehicle.lastUpdated.toLocaleString(),
        });
      });

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=vehicles.xlsx"
      );

      return workbook.xlsx.write(res).then(() => res.status(200).end());
    } else {
      res.status(400).json({ message: "Invalid export format" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
