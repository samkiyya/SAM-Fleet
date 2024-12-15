"use client";

import React, { useState } from "react";
import { Vehicle } from "@/types/vehicle";
import { updateVehicle } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VehicleDetailsProps {
  vehicle: Vehicle;
  onClose: () => void;
  onUpdate: (updatedVehicle: Vehicle) => void;
}

export default function VehicleDetails({
  vehicle,
  onClose,
  onUpdate,
}: VehicleDetailsProps) {
  const [editedVehicle, setEditedVehicle] = useState<Vehicle>(vehicle);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedVehicle((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting edited vehicle:", editedVehicle);
    if (!editedVehicle._id) {
      console.error("Vehicle ID is missing!");
      return;
    }
    try {
      const updatedVehicle = await updateVehicle(editedVehicle);
      onUpdate(updatedVehicle);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update vehicle:", error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Vehicle" : vehicle.name}</DialogTitle>
        </DialogHeader>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={editedVehicle.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                name="type"
                value={editedVehicle.type}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="licensePlate">License Plate</Label>
              <Input
                id="licensePlate"
                name="licensePlate"
                value={editedVehicle.licensePlate}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="driver">Driver</Label>
              <Input
                id="driver"
                name="driver"
                value={editedVehicle.driver}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="mileage">Mileage</Label>
              <Input
                id="mileage"
                name="mileage"
                type="number"
                value={editedVehicle.mileage}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="fuelLevel">Fuel Level</Label>
              <Input
                id="fuelLevel"
                name="fuelLevel"
                type="number"
                value={editedVehicle.fuelLevel}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                name="status"
                value={editedVehicle.status}
                onValueChange={(value) =>
                  handleChange({
                    target: { name: "status", value },
                  } as React.ChangeEvent<HTMLSelectElement>)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Under Maintenance">
                    Under Maintenance
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="submit">Save Changes</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <p>
              <strong>Type:</strong> {vehicle.type}
            </p>
            <p>
              <strong>License Plate:</strong> {vehicle.licensePlate}
            </p>
            <p>
              <strong>Driver:</strong> {vehicle.driver}
            </p>
            <p>
              <strong>Mileage:</strong> {vehicle.mileage}
            </p>
            <p>
              <strong>Fuel Level:</strong> {vehicle.fuelLevel}
            </p>
            <p>
              <strong>Status:</strong> {vehicle.status}
            </p>
            <p>
              <strong>Last Updated:</strong>{" "}
              {new Date(vehicle.lastUpdated).toLocaleString("en-US")}
            </p>
            <div className="flex justify-end">
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
