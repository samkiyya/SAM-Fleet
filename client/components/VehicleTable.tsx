"use client";

import { useState } from "react";
import { Vehicle } from "@/types/vehicle";
import { updateVehicleStatus, deleteVehicle } from "@/lib/api";
import VehicleDetails from "./VehicleDetails";
import { Trash2, Edit, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface VehicleTableProps {
  vehicles: Vehicle[];
  onUpdateVehicle: (updatedVehicle: Vehicle) => void;
  onDeleteVehicle: (id: string) => void;
}

export default function VehicleTable({
  vehicles,
  onUpdateVehicle,
  onDeleteVehicle,
}: VehicleTableProps) {
  const [sortField, setSortField] = useState<keyof Vehicle>("lastUpdated");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const sortedVehicles = [...vehicles].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const filteredVehicles = sortedVehicles.filter(
    (vehicle) =>
      (vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.licensePlate
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      (!statusFilter || vehicle.status === statusFilter)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVehicles = filteredVehicles.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleSort = (field: keyof Vehicle) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleStatusChange = async (
    id: string,
    newStatus: Vehicle["status"]
  ) => {
    try {
      const updatedVehicle = await updateVehicleStatus(id, newStatus);
      onUpdateVehicle(updatedVehicle);
    } catch (error) {
      console.error("Failed to update vehicle status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await deleteVehicle(id);
        onDeleteVehicle(id);
      } catch (error) {
        console.error("Failed to delete vehicle:", error);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 space-y-4">
        <input
          type="text"
          placeholder="Search vehicles..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full p-2 border rounded"
          value={statusFilter || ""}
          onChange={(e) => setStatusFilter(e.target.value || null)}
        >
          <option key="all" value="">
            All Statuses
          </option>
          <option key="Active" value="Active">
            Active
          </option>
          <option key="Inactive" value="Inactive">
            Inactive
          </option>
          <option key="Under Maintenance" value="Under Maintenance">
            Under Maintenance
          </option>
        </select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Vehicle Name
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("status")}
            >
              Status
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("lastUpdated")}
            >
              Last Updated
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentVehicles.map((vehicle) => (
            <TableRow key={`${vehicle._id}-${vehicle.name}`}>
              <TableCell>{vehicle.name}</TableCell>
              <TableCell>
                <select
                  value={vehicle.status}
                  onChange={(e) =>
                    handleStatusChange(
                      vehicle._id,
                      e.target.value as Vehicle["status"]
                    )
                  }
                  className={`py-1 px-3 rounded-full text-xs ${
                    vehicle.status === "Active"
                      ? "bg-green-200 text-green-600"
                      : vehicle.status === "Inactive"
                      ? "bg-red-200 text-red-600"
                      : "bg-yellow-200 text-yellow-600"
                  }`}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                </select>
              </TableCell>
              <TableCell>
                {new Date(vehicle.lastUpdated).toLocaleString("en-US")}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(vehicle._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between p-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <span>
          Page {currentPage} of{" "}
          {Math.ceil(filteredVehicles.length / itemsPerPage)}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(
                prev + 1,
                Math.ceil(filteredVehicles.length / itemsPerPage)
              )
            )
          }
          disabled={
            currentPage === Math.ceil(filteredVehicles.length / itemsPerPage)
          }
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
      {selectedVehicle && (
        <VehicleDetails
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          onUpdate={(updatedVehicle) => {
            onUpdateVehicle(updatedVehicle);
            setSelectedVehicle(null);
          }}
        />
      )}
    </div>
  );
}
