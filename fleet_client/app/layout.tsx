import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { VehicleProvider } from "@/context/VehicleContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vehicle Management Dashboard",
  description: "Manage your vehicle fleet efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <VehicleProvider>
          {children}
          <Toaster />
        </VehicleProvider>
      </body>
    </html>
  );
}
