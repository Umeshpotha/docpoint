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
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true, // Enable infinite looping
        slidesToScroll: 1, // Scroll one slide at a time
      }}
      plugins={[plugin.current]}
      className="w-full max-w-3xl mx-auto shadow-lg rounded-lg overflow-hidden"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {services.concat(services).slice(0, 4).map((service, index) => ( // Duplicate services for infinite scroll
          <CarouselItem key={index} className="lg:basis-1/2">
            <div className="p-1">
              <Card className="rounded-lg transform hover:scale-105 transition duration-300 ease-in-out shadow-xl">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <CardContent className="p-6 bg-slate-50 rounded-b-lg">
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">{service.title}</h2>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 text-black" />
      <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 text-black" /> */}
    </Carousel>
  );
}
