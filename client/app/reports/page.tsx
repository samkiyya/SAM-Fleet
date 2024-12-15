"use client";
import Header from "@/components/Header";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useVehicleContext } from "@/context/VehicleContext";

export default function ReportsPage() {
  const { vehicles } = useVehicleContext(); 

  const totalVehicles = vehicles.length;
  const activeVehicles = vehicles.filter((v) => v.status === "Active").length;
  const inactiveVehicles = vehicles.filter(
    (v) => v.status === "Inactive"
  ).length;
  const maintenanceVehicles = vehicles.filter(
    (v) => v.status === "Under Maintenance"
  ).length;
  const averageMileage =
    vehicles.reduce((sum, v) => sum + v.mileage, 0) / totalVehicles;
  const totalFuelLevel = vehicles.reduce((sum, v) => sum + v.fuelLevel, 0);
  const averageFuelLevel = totalFuelLevel / totalVehicles;

  const statusData = [
    { name: "Active", value: activeVehicles },
    { name: "Inactive", value: inactiveVehicles },
    { name: "Under Maintenance", value: maintenanceVehicles },
  ];

  const COLORS = ["#00C49F", "#FF8042", "#FFBB28"];

  const mileageData = vehicles
    .map((v) => ({
      name: v.name,
      mileage: v.mileage,
    }))
    .sort((a, b) => b.mileage - a.mileage)
    .slice(0, 5);

  const fuelLevelData = vehicles
    .map((v) => ({
      name: v.name,
      fuelLevel: v.fuelLevel,
    }))
    .sort((a, b) => b.fuelLevel - a.fuelLevel)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold mb-12 text-center text-white">
          Fleet Analytics Report
        </h1>

        {/* Overview Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-r from-teal-400 to-teal-600 shadow-xl rounded-lg p-6 text-center">
            <p className="text-sm">Total Vehicles</p>
            <p className="text-4xl font-bold">{totalVehicles}</p>
          </div>
          <div className="bg-gradient-to-r from-green-400 to-green-600 shadow-xl rounded-lg p-6 text-center">
            <p className="text-sm">Active Vehicles</p>
            <p className="text-4xl font-bold">{activeVehicles}</p>
          </div>
          <div className="bg-gradient-to-r from-orange-400 to-orange-600 shadow-xl rounded-lg p-6 text-center">
            <p className="text-sm">Average Mileage</p>
            <p className="text-4xl font-bold">{averageMileage.toFixed(2)} km</p>
          </div>
          <div className="bg-gradient-to-r from-red-400 to-red-600 shadow-xl rounded-lg p-6 text-center">
            <p className="text-sm">Vehicles Under Maintenance</p>
            <p className="text-4xl font-bold">{maintenanceVehicles}</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-xl rounded-lg p-6 text-center">
            <p className="text-sm">Average Fuel Level</p>
            <p className="text-4xl font-bold">
              {averageFuelLevel.toFixed(2)} %
            </p>
          </div>
        </div>

        {/* Vehicle Status Pie Chart */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-12">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Vehicle Status Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top 5 Vehicles by Mileage */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-12">
          <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Top 5 Vehicles by Mileage
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mileageData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="mileage" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top 5 Vehicles by Fuel Level */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-12">
          <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Top 5 Vehicles by Fuel Level
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fuelLevelData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="fuelLevel" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}
