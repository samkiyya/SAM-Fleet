"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { fetchVehicles } from "@/lib/api";
import { Vehicle } from "@/types/vehicle";
interface VehicleContextType {
  vehicles: Vehicle[];
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
}

interface VehicleProviderProps {
  children: ReactNode;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const useVehicleContext = () => {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error("useVehicleContext must be used within a VehicleProvider");
  }
  return context;
};

export const VehicleProvider: React.FC<VehicleProviderProps> = ({
  children,
}) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const data = await fetchVehicles();
        setVehicles(data);
      } catch (err) {
        console.error("Failed to load vehicles:", err);
      }
    };
    loadVehicles();
  }, []);

  return (
    <VehicleContext.Provider value={{ vehicles, setVehicles }}>
      {children}
    </VehicleContext.Provider>
  );
};
