import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  licensePlate: { type: String, required: true, unique: true },
  driver: { type: String, required: true },
  mileage: { type: Number, required: true },
  fuelLevel: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Under Maintenance"],
    default: "Active",
  },
  lastUpdated: { type: Date, default: Date.now },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
