import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
  const [imageUrl, setImageUrl] = useState('/placeholder.jpg');

  useEffect(() => {
    const fetchPlaceImage = async () => {
      if (!place?.placeName) return;

      const API_KEY = 'AIzaSyBTAbt3n7dyME6-599uLSqlslzjEmdNap4'; // Replace with your actual API key
      const CSE_ID = 'c06e99e3c0c2d4571';
      const query = encodeURIComponent(place.placeName);

      const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${CSE_ID}&searchType=image&imgSize=large&imgType=photo&key=${API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setImageUrl(data.items[0].link);
        }
      } catch (error) {
        console.error('Error fetching place image:', error);
      }
    };

    fetchPlaceImage();
  }, [place?.placeName]);

  return (
    <div>
      <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName} target='_blank'>
        <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer'>
          <img
            src={imageUrl}
            alt={place.placeName || 'Place image'}
            className='w-[300px] h-[200px] rounded-xl object-cover'
          />
          <div>
            <h2 className='font-bold text-lg'>{place.placeName}</h2>
            <p className='text-sm text-gray-500'>{place.placeDetails}</p>
            <h2 className='font-bold text-md'>⏱️ {place.timeTravel}</h2>
            <h2 className='font-bold text-md'>🎫 {place.ticketPricing}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PlaceCardItem;
