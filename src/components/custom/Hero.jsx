import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const imageUrls = [
  
  "https://cdn.pixabay.com/photo/2019/08/09/21/52/london-4395917_1280.jpg",
  "https://cdn.pixabay.com/photo/2020/03/03/20/31/boat-4899802_1280.jpg",
  "https://cdn.pixabay.com/photo/2023/09/22/07/52/beach-8268375_1280.jpg",
  "https://cdn.pixabay.com/photo/2021/10/10/20/33/mehtab-bagh-6698669_1280.jpg",
  "https://cdn.pixabay.com/photo/2023/05/22/10/49/houses-8010401_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/11/22/08/37/thames-541456_1280.jpg",
  "https://cdn.pixabay.com/photo/2020/03/09/21/30/museum-4917179_1280.jpg",
  "https://cdn.pixabay.com/photo/2020/01/25/19/13/paris-4793193_1280.jpg"
  // Add more URLs as needed
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % imageUrls.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handlePrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % imageUrls.length);
  };

  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1 className='font-extrabold text-6xl text-center mt-16 text-[#544987]'>
        <span className='text-[#5e42db]'>Discover Your Next Destination with</span> TravelGenius
      </h1>
      <h3 className='text-2xl text-gray-700 text-center'>
        Transforming Travel Planning Through Artificial Intelligence
      </h3>
      <h3 className='text-3xl text-gray-900 text-center'>
        Not all those who wander are lost!
      </h3>
      <Link to={'/create-trip'}>
        <Button>Get Started!</Button>
      </Link>
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {imageUrls.map((url, index) => (
            <CarouselItem
              key={index}
              className={`pl-2 md:pl-4 ${index === currentIndex ? 'block' : 'hidden'}`}
            >
              <img src={url} alt={`Slide ${index + 1}`} className=" mb-10 w-[800px] h-[450px] rounded-xl" />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious onClick={handlePrevious} />
        <CarouselNext onClick={handleNext} /> */}
      </Carousel>
    </div>
  );
}

export default Hero;
