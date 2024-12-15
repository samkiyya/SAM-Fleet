"use client";
import Header from "@/components/Header";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("opacity-100");
      }, index * 300);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-500">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12 fade-in opacity-0 transition-opacity duration-700">
          <motion.h1
            className="text-5xl font-extrabold text-white leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            About This App
          </motion.h1>
          <p className="text-lg text-white mt-2 max-w-2xl mx-auto">
            A sophisticated vehicle management app designed with modern
            technologies, providing powerful backend features and a smooth,
            responsive user interface.
          </p>
        </div>

        {/* How This App Was Designed Section */}
        <section className="bg-white shadow-xl rounded-lg p-8 mb-12 max-w-4xl mx-auto transform  hover:scale-105 hover:shadow-2xl  fade-in opacity-0 transition-opacity duration-700">
          <motion.h2
            className="text-3xl font-semibold text-gray-800 mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            How This App Was Designed
          </motion.h2>
          <p className="text-gray-700 leading-relaxed">
            This web application is built using <b>Next.js</b> (a React.js
            framework) for a faster and SEO-friendly experience. The backend is
            powered by <b>Node.js</b> and <b>Express.js</b>, with <b>MongoDB</b>{" "}
            as the database solution. The frontend design uses{" "}
            <b>Tailwind CSS</b>, ensuring a smooth, responsive, and visually
            stunning UI. Key features include:
          </p>
          <ul className="list-inside list-disc mt-4 text-gray-600">
            <li>Real-time vehicle data management</li>
            <li>
              Searching and sorting or filtering by vehicle name, status, and
              last updated date
            </li>
            <li>Responsive semi mobile-first design</li>
            <li>Elegant Statistics or report with graphical information</li>
          </ul>
        </section>

        {/* About Me Section */}
        <section className="bg-gray-50 shadow-xl rounded-lg p-8 mb-12 max-w-4xl mx-auto transform  hover:scale-105 hover:shadow-2xl  fade-in opacity-0 transition-opacity duration-700">
          <motion.h2
            className="text-3xl font-semibold text-gray-800 mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            About Me
          </motion.h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            I&apos;m <span className="font-extrabold">Samuel Aberra</span>, a
            passionate software developer with a background in Information
            Systems and a love for creating scalable and robust applications. I
            specialize in both frontend and backend development, leveraging
            technologies like <b>React.js</b>, <b>Next.js</b>, <b>Node.js</b>,
            and
            <b> Express.js</b> to build seamless web applications. My projects
            reflect my deep understanding of how to create efficient, beautiful,
            and highly functional software solutions.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This app demonstrates my skills in integrating backend technologies
            with frontend frameworks to provide a smooth user experience while
            maintaining solid, scalable backend infrastructure. I&apos;m always
            eager to learn new technologies and challenges, and I am excited to
            continue growing in the world of full-stack development.
          </p>
        </section>

        {/* Contact Information Section */}
        <section className="bg-white shadow-xl rounded-lg p-8 mb-12 max-w-4xl mx-auto transform  hover:scale-105 hover:shadow-2xl  fade-in opacity-0 transition-opacity duration-700">
          <motion.h2
            className="text-3xl font-semibold text-gray-800 mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Contact Details
          </motion.h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              <strong>Email:</strong>
              <a
                href="mailto:samuelabera523@gmail.com"
                className="text-blue-500 hover:text-blue-700"
              >
                samuelabera523@gmail.com
              </a>
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong>{" "}
              <span className="text-blue-500">+251914919398</span>
            </p>
            <p className="text-gray-700">
              <strong>Location:</strong>{" "}
              <span className="text-blue-500">Addis Ababa, Ethiopia</span>
            </p>
          </div>
        </section>

        {/* Copyright Section */}
        <section className="bg-gray-50 shadow-xl rounded-lg p-8 mb-12 max-w-4xl mx-auto text-center fade-in opacity-0 transition-opacity duration-700">
          <motion.p
            className="text-gray-700 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            &copy; 2024 Samuel Aberra. All rights reserved.
          </motion.p>
        </section>
      </main>
    </div>
  );
}
