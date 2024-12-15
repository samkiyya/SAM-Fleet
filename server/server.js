import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import vehicleRoutes from "./routes/vehicleRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use("/api/vehicles", vehicleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
