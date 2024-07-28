import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Hotels({ trip }) {
  const [hotelImages, setHotelImages] = useState({});

  useEffect(() => {
    if (!trip?.tripData?.hotelOptions) return;

    const fetchHotelImages = async () => {
      const API_KEY = 'AIzaSyBTAbt3n7dyME6-599uLSqlslzjEmdNap4'; // Replace with your actual API key
      const CSE_ID = 'c06e99e3c0c2d4571';

      const images = {};

      for (const hotel of trip.tripData.hotelOptions) {
        const query = encodeURIComponent(hotel.hotelName);
        const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${CSE_ID}&searchType=image&imgSize=large&imgType=photo&key=${API_KEY}`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          if (data.items && data.items.length > 0) {
            images[hotel.hotelName] = data.items[0].link;
          }
        } catch (error) {
          console.error('Error fetching hotel image:', error);
        }
      }

      setHotelImages(images);
    };

    fetchHotelImages();
  }, [trip]);

  return (
    <div>
      <h2 className='mt-5 mb-3 font-bold text-2xl'>Hotel Recommendations</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {trip?.tripData?.hotelOptions?.map((hotel, index) => (
          <Link
            key={index}
            to={'https://www.google.com/maps/search/?api=1&query=' + hotel.hotelName + ',' + hotel.hotelAddress}
            target='_blank'
          >
            <div className='hover:scale-105 transition-all cursor-pointer'>
              <img
                src={hotelImages[hotel.hotelName] || '/placeholder.jpg'}
                className='rounded-xl w-[300px] h-[200px] object-cover' // Fixed size and object fit
                alt={hotel.hotelName}
              />
              <div>
                <h2 className='font-medium'>{hotel.hotelName}</h2>
                <h2 className='text-xs text-gray-500'>📌 {hotel.hotelAddress}</h2>
                <h2 className='text-sm'>💸 {hotel?.price}</h2>
                <h2 className='text-sm'>⭐ {hotel?.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
