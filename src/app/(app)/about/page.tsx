"use client";  // Ensure this is at the top and followed by imports
import React, { useState, useEffect } from "react";  // React is default exported, no need for '* as React'
import Link from "next/link";  // No changes here

// Steps for the How It Works section
const steps = [
 
  {
    icon: "fa-calendar-check",
    title: "Scheduling",
    description: "Schedule appointments at your convenience.",
  },
  {
    icon: "fa-cogs",
    title: "Management ",
    description: "Manage or reschedule your appointments easily.",
  },
  {
    icon: "fa-credit-card",
    title: "Payment",
    description: "Securely complete payments for appointments.",
  },
  {
    icon: "fa-map-marker-alt",
    title: "Tracking",
    description: "Track your appointment status in real-time.",
  },
  {
    icon: "fa-comments",
    title: "Doctor Response",
    description: "Receive updates from the doctor about your appointment.",
  },
];

const About = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % steps.length);
    }, 2000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white p-5 overflow-hidden">
      <h1 className="text-5xl font-bold tracking-wider mb-6 text-teal-400 text-center">
        About Doctors Point
      </h1>

      <p className="text-xl text-gray-300 mb-10 text-center">
        Doctors Point is a healthcare platform that simplifies doctor appointments, hospital searches, and doctor availability tracking. Our mission is to provide seamless, accessible healthcare services for everyone.
      </p>

      <div className="w-full max-w-4xl text-center mb-10">
        <h2 className="text-3xl font-semibold text-teal-400 mb-6">How It Works</h2>
        <div className="flex justify-around items-center">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col items-center transform transition-transform duration-1000 ${
                activeStep === index ? "scale-110" : "scale-100"
              }`}
            >
              <div
                className={`bullet w-16 h-16 ${
                  activeStep === index ? "bg-teal-500" : "bg-gray-700"
                } text-white rounded-full flex justify-center items-center mb-4 transition-all duration-500`}
              >
                <i className={`fas ${step.icon} text-3xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-teal-400 mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
              
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 text-center mb-10">
        <Link href="/contact" passHref>
          <button className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg shadow-lg">
            Contact Us
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
