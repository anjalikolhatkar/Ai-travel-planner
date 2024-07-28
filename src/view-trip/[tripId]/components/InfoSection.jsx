import React, { useEffect, useState } from 'react';

function InfoSection({ trip }) {
  const [imageUrl, setImageUrl] = useState('/placeholder.jpg');
  const location = trip?.userSelection?.location?.label;

  useEffect(() => {
    const fetchImage = async () => {
      if (!location) return;

      const API_KEY = 'AIzaSyBTAbt3n7dyME6-599uLSqlslzjEmdNap4'; // Replace with your actual API key
      const CSE_ID = 'c06e99e3c0c2d4571';
      const query = encodeURIComponent(`popular  ${location} places`);

      const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${CSE_ID}&searchType=image&imgSize=large&key=${API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          // Choose the best image from the results
          setImageUrl(data.items[0].link);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [location]);

  return (
    <div>
      <img
        src={imageUrl}
        alt={location || 'Trip image'}
        className='h-[300px] w-full object-cover  rounded-xl'
        style={{ objectPosition: 'center' }}
      />
      <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl'>{location || 'Unknown Location'}</h2>
      </div>
      <div className='flex gap-5'>
        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text'>
          📅 {trip?.userSelection?.noofDays || 'N/A'} Days
        </h2>
        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text'>
          💰 {trip?.userSelection?.budget || 'N/A'} Budget
        </h2>
        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text'>
          👫 No. of Travellers: {trip?.userSelection?.travellers || 'N/A'}
        </h2>
      </div>
    </div>
  );
}

export default InfoSection;