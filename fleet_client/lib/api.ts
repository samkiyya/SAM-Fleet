import axios from "axios";
import { Vehicle } from "@/types/vehicle";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const fetchVehicles = async (): Promise<Vehicle[]> => {
  const response = await axios.get(`${API_URL}/vehicles`);
  return response.data;
};

export const fetchVehicleById = async (id: string): Promise<Vehicle> => {
  const response = await axios.get(`${API_URL}/vehicles/${id}`);
  return response.data;
};

export const addVehicle = async (
  vehicle: Omit<Vehicle, "id" | "lastUpdated">
): Promise<Vehicle> => {
  const response = await axios.post(`${API_URL}/vehicles`, vehicle);
  return response.data;
};

export const updateVehicle = async (vehicle: Vehicle): Promise<Vehicle> => {
  console.log("Updating vehicle with ID:", vehicle._id); // Debugging line

  if (!vehicle._id || vehicle._id.length !== 24) {
    throw new Error("Invalid vehicle ID");
  }
  const response = await axios.put(
    `${API_URL}/vehicles/${vehicle._id}`,
    vehicle
  );
  return response.data;
};

export const updateVehicleStatus = async (
  id: string,
  status: Vehicle["status"]
): Promise<Vehicle> => {
  const response = await axios.put(`${API_URL}/vehicles/${id}/status`, {
    status,
  });
  return response.data;
};

export const deleteVehicle = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/vehicles/${id}`);
};

export const exportVehicles = async (format: "csv" | "xlsx"): Promise<Blob> => {
  const response = await axios.get(`${API_URL}/vehicles/export`, {
    params: { format },
    responseType: "blob",
  });
  return response.data;
};
