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
    <div className="flex flex-col items-center justify-center min-h-screen   text-white p-5 overflow-hidden dark:from-black dark:to-gray-800 dark:bg-gradient-to-br dark:text-black  "
    >
      <h1 className="text-5xl font-bold tracking-wider mb-6 text-sky-400 text-center dark:text-teal-500">
      Welcome to Doctors Point!
      </h1>
      <p className="text-xl text-black mb-10 text-center dark:text-gray-300">
       
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
          <button className="px-6 py-3 bg-sky-500 hover:border-2 hover:border-sky-500 hover:bg-transparent hover:text-sky-500 transition-all duration-300 text-white rounded-lg shadow-lg dark:bg-teal-500 dark:hover:border-2 dark:hover:border-teal-500 dark:hover:bg-transparent">
            Discover More
          </button>
        </Link>
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default Home;
