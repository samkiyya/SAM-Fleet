"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import VehicleTable from "@/components/VehicleTable";
import AddVehicleForm from "@/components/AddVehicleForm";
import StatisticsDashboard from "@/components/StatisticsDashboard";
import { fetchVehicles, exportVehicles } from "@/lib/api";
import { Vehicle } from "@/types/vehicle";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setIsLoading(true);
        const data = await fetchVehicles();
        setVehicles(data);
        setError(null);
      } catch (err) {
        setError("Failed to load vehicles. Please try again later.");
        console.error("Failed to load vehicles:", err);
        toast({
          title: "Error",
          description: "Failed to load vehicles. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadVehicles();
  }, [toast]);

  const handleAddVehicle = (newVehicle: Vehicle) => {
    setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
    setIsAddingVehicle(false);
    toast({
      title: "Success",
      description: "Vehicle added successfully.",
      style: {
        backgroundColor: "#4CAF50",
        color: "#fff",
      },
    });
  };

  const handleUpdateVehicle = (updatedVehicle: Vehicle) => {
    if (!updatedVehicle._id || updatedVehicle._id.length !== 24) {
      console.error("Invalid vehicle ID:", updatedVehicle._id);
      toast({
        title: "Error",
        description: "Invalid vehicle ID",
        variant: "destructive",
      });
      return;
    }

    setVehicles((prevVehicles) =>
      prevVehicles.map((v) =>
        v._id.toString() === updatedVehicle._id.toString() ? updatedVehicle : v
      )
    );
    toast({
      title: "Success",
      description: "Vehicle updated successfully.",
      style: {
        backgroundColor: "#4CAF50",
        color: "#fff",
      },
    });
  };

  const handleDeleteVehicle = (id: string) => {
    setVehicles((prevVehicles) =>
      prevVehicles.filter((v) => v._id.toString() !== id)
    );
    toast({
      title: "Success",
      description: "Vehicle deleted successfully.",
      style: {
        backgroundColor: "#4CAF50",
        color: "#fff",
      },
    });
  };

  const handleExport = async (format: "csv" | "xlsx") => {
    try {
      const blob = await exportVehicles(format);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `vehicles.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      toast({
        title: "Success",
        description: `Vehicles exported as ${format.toUpperCase()} successfully.`,
        style: {
          backgroundColor: "#4CAF50",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("Failed to export vehicles:", error);
      toast({
        title: "Error",
        description: "Failed to export vehicles. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 animate-gradient">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 animate__animated animate__fadeIn">
          Vehicle Management Dashboard
        </h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            <p className="text-xl">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 animate__animated animate__fadeInUp">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Vehicle List</h2>
                <div className="space-x-2">
                  <Button onClick={() => setIsAddingVehicle(true)}>
                    Add Vehicle
                  </Button>
                  <Button onClick={() => handleExport("csv")} variant="outline">
                    Export CSV
                  </Button>
                  <Button
                    onClick={() => handleExport("xlsx")}
                    variant="outline"
                  >
                    Export Excel
                  </Button>
                </div>
              </div>
              <VehicleTable
                vehicles={vehicles}
                onUpdateVehicle={handleUpdateVehicle}
                onDeleteVehicle={handleDeleteVehicle}
              />
            </div>
            <div className="animate__animated animate__fadeInUp">
              <StatisticsDashboard vehicles={vehicles} />
            </div>
          </div>
        )}
        {isAddingVehicle && (
          <AddVehicleForm
            onAdd={handleAddVehicle}
            onClose={() => setIsAddingVehicle(false)}
          />
        )}
      </main>
    </div>
  );
}
