import { useState } from "react";
import { Vehicle } from "@/types/vehicle";
import { addVehicle } from "@/lib/api";

interface AddVehicleFormProps {
  onAdd: (vehicle: Vehicle) => void;
  onClose: () => void;
}

export default function AddVehicleForm({
  onAdd,
  onClose,
}: AddVehicleFormProps) {
  const [vehicle, setVehicle] = useState<Partial<Vehicle>>({
    name: "",
    type: "",
    licensePlate: "",
    driver: "",
    mileage: 0,
    fuelLevel: 0,
    status: "Active",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newVehicle = await addVehicle(vehicle as Vehicle);
      onAdd(newVehicle);
    } catch (error) {
      console.error("Failed to add vehicle:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setVehicle((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Add New Vehicle
          </h3>
          <form onSubmit={handleSubmit} className="mt-2">
            <input
              type="text"
              name="name"
              value={vehicle.name}
              onChange={handleChange}
              placeholder="Vehicle Name"
              className="mt-2 p-2 w-full border rounded"
              required
            />
            <input
              type="text"
              name="type"
              value={vehicle.type}
              onChange={handleChange}
              placeholder="Vehicle Type"
              className="mt-2 p-2 w-full border rounded"
              required
            />
            <input
              type="text"
              name="licensePlate"
              value={vehicle.licensePlate}
              onChange={handleChange}
              placeholder="License Plate"
              className="mt-2 p-2 w-full border rounded"
              required
            />
            <input
              type="text"
              name="driver"
              value={vehicle.driver}
              onChange={handleChange}
              placeholder="Driver"
              className="mt-2 p-2 w-full border rounded"
              required
            />
            <input
              type="number"
              name="mileage"
              value={vehicle.mileage}
              onChange={handleChange}
              placeholder="Mileage"
              className="mt-2 p-2 w-full border rounded"
              required
            />
            <input
              type="number"
              name="fuelLevel"
              value={vehicle.fuelLevel}
              onChange={handleChange}
              placeholder="Fuel Level"
              className="mt-2 p-2 w-full border rounded"
              required
            />
            <select
              name="status"
              value={vehicle.status}
              onChange={handleChange}
              className="mt-2 p-2 w-full border rounded"
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Under Maintenance">Under Maintenance</option>
            </select>
            <div className="items-center px-4 py-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Add Vehicle
              </button>
            </div>
          </form>
          <button
            onClick={onClose}
            className="mt-3 px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
