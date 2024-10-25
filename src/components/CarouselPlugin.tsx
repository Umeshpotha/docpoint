import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Service } from "@/types/servicetypes";

interface CarouselPluginProps {
  services: Service[];
}

export function CarouselPlugin({ services }: CarouselPluginProps) {
  // Initialize autoplay plugin with delay and interaction behavior
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true, // Enable infinite looping
        slidesToScroll: 1, // Scroll one slide at a time
      }}
      plugins={[plugin.current]} // Autoplay plugin
      className="w-full max-w-3xl mx-auto shadow-lg rounded-lg overflow-hidden relative"
      onMouseEnter={plugin.current.stop} // Stop autoplay on hover
      onMouseLeave={plugin.current.reset} // Reset autoplay on leave
      aria-label="Service Carousel"
    >
      <CarouselContent>
        {services.map((service, index) => (
          <CarouselItem key={index} className="lg:basis-1/2 ">
            <div className="p-1 ">
              <Card className="rounded-lg transform  hover:scale-105 transition duration-300 ease-in-out shadow-xl">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-56 object-cover rounded-t-lg"
                  aria-label={service.title}
                />
                <CardContent className="p-6 bg-slate-200 dark:bg-gray-800 rounded-b-lg">
                  <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">{service.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      
      {/* Navigation Controls */}
      <CarouselPrevious 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-black dark:text-white cursor-pointer" 
        aria-label="Previous slide" 
      />
      <CarouselNext 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-black dark:text-white cursor-pointer" 
        aria-label="Next slide" 
      />
    </Carousel>
  );
}
