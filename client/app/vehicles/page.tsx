"use client";
import { useEffect, useState } from "react";
import { fetchVehicles } from "@/lib/api";
import { Vehicle } from "@/types/vehicle";
import Header from "@/components/Header";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const getVehicles = async () => {
      try {
        const fetchedVehicles = await fetchVehicles();
        setVehicles(fetchedVehicles);
      } catch (error) {
        console.error("Failed to fetch vehicles:", error);
      }
    };
    getVehicles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Title Animation */}
        <motion.h2
          className="text-3xl font-bold text-white mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          List of All Vehicles
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <motion.div
              key={vehicle._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <Card className="bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
                <CardContent className="text-white p-6 backdrop-blur-none">
                  <div className="flex flex-col space-y-4">
                    {/* Vehicle Name with extra emphasis */}
                    <CardTitle className="text-3xl font-bold text-gray-100">
                      {vehicle.name}
                    </CardTitle>
                    {/* Additional Details */}
                    <div className="flex justify-between text-gray-200">
                      <span>Type: {vehicle.type}</span>
                      <span>License Plate: {vehicle.licensePlate}</span>
                    </div>
                    <div className="flex justify-between text-gray-200">
                      <span>Driver: {vehicle.driver}</span>
                      <span>Mileage: {vehicle.mileage} km</span>
                    </div>
                    <div className="flex justify-between text-gray-200">
                      <span>Fuel Level: {vehicle.fuelLevel}%</span>
                      <span
                        className={`text-sm font-semibold ${
                          vehicle.status === "Active"
                            ? "text-green-600"
                            : vehicle.status === "Under Maintenance"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        Status: {vehicle.status}
                      </span>
                    </div>
                  </div>
                </CardContent>

                {/* Button with hover animation */}
                <motion.div
                  className="p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md transition-all duration-500 transform hover:scale-110 hover:bg-blue-700">
                    View Details
                  </button>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default VehiclesPage;
