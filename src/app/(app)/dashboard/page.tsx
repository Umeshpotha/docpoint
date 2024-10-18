import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import React from 'react'

const hospitals = [
  {
    id: 1,
    title: 'Sunshine City Hospital',
    description: 'Type: General Hospital',
    location: '123 Medical St., Healthcare City',
    image: 'https://media.gettyimages.com/id/1312706413/photo/modern-hospital-building.jpg?s=612x612&w=gi&k=20&c=1-EC4Mxf--5u4ItDIzrIOrduXlbKRnbx9xWWtiifrDo=',
    tags: ['General', 'Emergency', 'Pediatrics'],
  },
  {
    id: 2,
    title: 'Green Valley Medical Center',
    description: 'Type: Specialty Hospital',
    location: '789 Wellness Ave., Green District',
    image: 'https://media.gettyimages.com/id/140762119/photo/hospital-building.jpg?s=612x612&w=gi&k=20&c=YJ_jHoU4Fv0Y3FZVV4NHb2LPijysOP4K2pPrENXI2Ok=',
    tags: ['Cardiology', 'Neurology', 'Oncology'],
  },
  {
    id: 3,
    title: 'Oceanview Health Center',
    description: 'Type: General Hospital',
    location: '456 Seaside Blvd., Ocean City',
    image: 'https://media.gettyimages.com/id/1312706483/photo/hospital.jpg?s=612x612&w=gi&k=20&c=Nmq1G96kX7rHwY2OG0BztmZTFmoBrJ3A4Ht9NlKcPhw=',
    tags: ['Dermatology', 'Orthopedics', 'Emergency'],
  },
  {
    id: 4,
    title: 'Mountain Peak Hospital',
    description: 'Type: General Hospital',
    location: '321 Summit Rd., Mountain Town',
    image: 'https://media.gettyimages.com/id/1312706453/photo/hospital-building.jpg?s=612x612&w=gi&k=20&c=vQIN4R_uAyZUd-BOI4Sx9h5Ko3QuMBcO4dFqEdBRFqA=',
    tags: ['General', 'Surgery'],
  },
  {
    id: 5,
    title: 'Riverbend Medical Institute',
    description: 'Type: Specialty Hospital',
    location: '654 River Rd., Riverside',
    image: 'https://media.gettyimages.com/id/140764623/photo/hospital-building.jpg?s=612x612&w=gi&k=20&c=8w7oe0QqqWklNUhB-wIsK5zE4Lgb6okAS9VY3tTRO6c=',
    tags: ['Orthopedics', 'Rehabilitation'],
  },
  {
    id: 6,
    title: 'Cedar Valley Hospital',
    description: 'Type: General Hospital',
    location: '987 Cedar St., Cedar Valley',
    image: 'https://media.gettyimages.com/id/1312706477/photo/hospital.jpg?s=612x612&w=gi&k=20&c=X7UwZSR1I8gks42bbqgC6_9Gcn_BQmZtn6C0F9LCQ0M=',
    tags: ['General', 'Emergency', 'Pediatrics'],
  },
];

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4 bg-black text-white w-full h-full"> {/* Set background to black and text to white */}
      <h1 className="text-3xl font-bold mb-6">Look for Hospitals</h1>
      <Carousel className="w-90">
        <CarouselContent>
          {hospitals.map((hospital) => (
            <CarouselItem key={hospital.id} className="lg:basis-1/4">
              <div className="p-1">
                <Card className="shadow-lg w-65 bg-gray-800"> {/* Card background color set to dark gray */}
                  <CardHeader>
                    <img 
                      src={hospital.image} 
                      alt={`${hospital.title} Image`} 
                      className="rounded-t-lg w-full h-24 object-cover" 
                    />
                  </CardHeader>
                  <CardContent className="p-2">
                    <h2 className="text-lg font-bold text-teal-400 mb-1">{hospital.title}</h2> {/* Adjusted text color for title */}
                    <p className="text-gray-300 text-xs">{hospital.description}</p> {/* Adjusted text color for description */}
                    <p className="text-gray-300 text-xs">Location: {hospital.location}</p> {/* Adjusted text color for location */}
                    <div className="mt-1">
                      {hospital.tags.map((tag, index) => (
                        <span key={index} className="inline-block bg-teal-500 text-white text-xs font-semibold mr-1 px-1 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-teal-500 text-white hover:bg-teal-600 text-xs">
                      View Doctors
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default Dashboard;
