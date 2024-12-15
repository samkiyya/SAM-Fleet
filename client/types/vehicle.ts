export interface Vehicle {
  _id: string;
  name: string;
  type: string;
  licensePlate: string;
  driver: string;
  mileage: number;
  fuelLevel: number;
  status: "Active" | "Inactive" | "Under Maintenance";
  lastUpdated: string;
}
