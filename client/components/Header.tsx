"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-gradient-to-r from-blue-700 via-indigo-500 to-purple-600 text-white p-4 shadow-xl sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Fleet Manager Text Link */}
        <Link
          href="/"
          className="text-2xl sm:text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-100 to-white drop-shadow-xl transform transition-all hover:scale-110"
        >
          Fleet Manager
        </Link>
        <div className="hidden md:flex space-x-8">
          <nav>
            <ul className="flex space-x-8">
              <li>
                <Link
                  href="/"
                  className={`text-lg font-medium hover:text-indigo-200 transition-all ${
                    pathname === "/" ? "font-bold text-indigo-300" : ""
                  }`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/vehicles"
                  className={`text-lg font-medium hover:text-indigo-200 transition-all ${
                    pathname === "/vehicles" ? "font-bold text-indigo-300" : ""
                  }`}
                >
                  Vehicles
                </Link>
              </li>
              <li>
                <Link
                  href="/reports"
                  className={`text-lg font-medium hover:text-indigo-200 transition-all ${
                    pathname === "/reports" ? "font-bold text-indigo-300" : ""
                  }`}
                >
                  Reports
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`text-lg font-medium hover:text-indigo-200 transition-all ${
                    pathname === "/about" ? "font-bold text-indigo-300" : ""
                  }`}
                >
                  About Me
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isOpen && (
        <nav className="md:hidden bg-gradient-to-r from-blue-700 via-indigo-500 to-purple-600 text-white p-4 shadow-lg rounded-b-xl">
          <ul className="space-y-4 text-center">
            <li>
              <Link
                href="/"
                className={`block text-xl font-medium hover:text-indigo-200 ${
                  pathname === "/" ? "font-bold text-indigo-300" : ""
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/vehicles"
                className={`block text-xl font-medium hover:text-indigo-200 ${
                  pathname === "/vehicles" ? "font-bold text-indigo-300" : ""
                }`}
              >
                Vehicles
              </Link>
            </li>
            <li>
              <Link
                href="/reports"
                className={`block text-xl font-medium hover:text-indigo-200 ${
                  pathname === "/reports" ? "font-bold text-indigo-300" : ""
                }`}
              >
                Reports
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`block text-xl font-medium hover:text-indigo-200 ${
                  pathname === "/about" ? "font-bold text-indigo-300" : ""
                }`}
              >
                About Me
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
