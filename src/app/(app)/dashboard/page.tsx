'use client';
import { SkeletonCard } from '@/components/SkeletonCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import HospitalModel, { Hospital } from '@/model/Hospital';
import populateHospitals from '@/scripts/populateHospitals';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cities, setCities] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch('/api/get-locations');
      const data = await response.json();
      setCities(['All Cities', ...data]);
    };

    fetchLocations();
  }, []);

  const handleViewDoctors = (hospitalId: string) => {
    router.push(`/hospital/${hospitalId}`);
  };

  const handleCityChange = async (city: string) => {
    setSelectedCity(city);
    if (city !== 'All Cities') {
      setLoading(true); 
      const response = await fetch(`/api/get-hospitals?location=${city}`);
      const data: Hospital[] = await response.json();
      setHospitals(data);
      setLoading(false); 
    } else {
      setHospitals([]);
    }
  };

  return (
    <div
      className="container mx-auto p-6 w-full min-w-fit min-h-screen bg-cover bg-center relative "
      style={{ backgroundImage: 'url("/images/background.webp")' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-35"  ></div>

      <div className="relative z-10 text-white">
        <h2 className="p-5 md:text-4xl lg:text-5xl font-bold text-center tracking-tight">
          Welcome to Doctors Point
        </h2>

        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold mb-6 border-b-4 inline-block pb-2 rounded-sm border-sky-500 pt-5">
            Look for Hospitals
          </h3>

          <Select value={selectedCity} onValueChange={handleCityChange}>
            <SelectTrigger className="w-[280px] bg-white dark:bg-gray-800 text-black p-2 rounded-md border-2 border-solid border-black dark:border-white">
              <SelectValue placeholder="Select Your Location" />
            </SelectTrigger>
            <SelectContent className="bg-slate-50 dark:bg-black">
              <SelectGroup>
                <SelectLabel className="text-lg">Cities</SelectLabel>
                {cities.map((city) => (
                  <SelectItem key={city} value={city} className="text-black dark:text-white">
                    {city}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="relative max-w-full p-3">
          <Carousel className="overflow-hidden p-2">
            <CarouselContent>
              {loading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="lg:basis-1/4">
                      <SkeletonCard />
                    </CarouselItem>
                  ))
                : hospitals.map((hospital: Hospital) => (
                    <CarouselItem className="lg:basis-1/4">
                      <div className="p-1">
                        <Card className="shadow-lg w-65 bg-slate-100 dark:bg-gray-800 transition-all ease-in-out delay-150 hover:scale-105">
                          <CardHeader>
                            <img
                              src={hospital.photoLink}
                              alt={`${hospital.name} Image`}
                              className="rounded-t-lg w-full h-36 object-cover border-2 border-solid border-sky-500"
                            />
                          </CardHeader>
                          <CardContent>
                            <h2 className="text-lg font-bold text-blue-400 mb-1 text-center">
                              {hospital.name}
                            </h2>
                          </CardContent>
                          <CardFooter>
                            <Button onClick={() => handleViewDoctors(hospital.name)} className="bg-blue-500 text-white hover:bg-transparent hover:border-2 hover:border-solid hover:border-sky-500 text-xs hover:text-black">
                              View Doctors
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
            </CarouselContent>

            <CarouselPrevious className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 bg-sky-500 hover:bg-transparent text-black p-2 rounded-full animate-bounce-sideways" />
            <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-sky-500 hover:bg-transparent text-black p-2 rounded-full animate-bounce-sideways" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
