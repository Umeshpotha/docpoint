"use client";
import * as React from "react";
import { CarouselPlugin } from "@/components/CarouselPlugin"; // Adjust the path based on your folder structure
import Link from "next/link";
import { BackgroundGradient } from "@/components/ui/background-gradient";

const services = [
  {
    title: "Look for Hospitals",
    description: "You can see a list of hospitals  ",
    image: "/images/service1.jpg",
  },
  {
    title: "Find Doctors",
    description: "Find  doctors near to your location.",
    image: "/images/service2.jpg",
  },
  {
    title: "Doctor Availability",
    description: "Real-time updates on doctor availability.",
    image: "/images/service3.jpg",
  },
  {
    title: "Appointment Scheduling",
    description: " Seemlessly Schedule appointments ",
    image: "/images/service4.jpg",
  },
];

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white p-5 overflow-hidden">
      <h1 className="text-5xl font-bold tracking-wider mb-6 text-teal-400 text-center ">
      Welcome to Doctors Point!
      </h1>
      <p className="text-xl text-gray-300 mb-10 text-center">
       
      Hassle-free doctor appointments, right from your device.
      </p>

      
      {/* <div className="mb-10 text-center">
        <h2 className="text-3xl font-semibold text-teal-400">Services</h2>
        <p className="text-lg text-gray-300 mt-2">
        The platform delivers an intuitive and responsive interface for users to make the Doctor's Appointment easy for them. 
        Explore our key features below.
        </p>
      </div> */}

      {/* Carousel Section with Box Shadow */}
      
      {/* <div className="w-100 h-25  overflow-hidden shadow-lg rounded-lg  bg-transparent"> */}

        <CarouselPlugin services={services} />

      
      

        <div className="mt-5 text-center mb-10">
        
        <Link href="/services" passHref>
          <button className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg shadow-lg">
            Discover More
          </button>
        </Link>
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default Home;
