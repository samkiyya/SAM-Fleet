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
import { Vehicle } from "@/types/vehicle";

interface StatisticsDashboardProps {
  vehicles: Vehicle[];
}

export default function StatisticsDashboard({
  vehicles,
}: StatisticsDashboardProps) {
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
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Fleet Statistics</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-600">Total Vehicles</p>
          <p className="text-2xl font-bold">{totalVehicles}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Average Mileage</p>
          <p className="text-2xl font-bold">{averageMileage.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Average Fuel Level</p>
          <p className="text-2xl font-bold">{averageFuelLevel.toFixed(2)}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Vehicles Under Maintenance</p>
          <p className="text-2xl font-bold">{maintenanceVehicles}</p>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Vehicle Status</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Top 5 Vehicles by Mileage
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mileageData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="mileage" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Top 5 Vehicles by Fuel Level
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={fuelLevelData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="fuelLevel" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
