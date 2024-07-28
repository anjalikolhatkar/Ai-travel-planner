import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
  const [imageUrl, setImageUrl] = useState('/placeholder.jpg');
  const location = trip?.userSelection?.location?.label;

  useEffect(() => {
    const fetchImage = async () => {
      if (!location) return;

      const API_KEY = 'AIzaSyBTAbt3n7dyME6-599uLSqlslzjEmdNap4'; // Replace with your actual API key
      const CSE_ID = 'c06e99e3c0c2d4571'; // Replace with your actual CSE ID
      const query = encodeURIComponent(`${location} landmark tourist attraction`);

      const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${CSE_ID}&searchType=image&imgSize=large&imgType=photo&key=${API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setImageUrl(data.items[0].link);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [location]);

  return (
    <Link to={'/view-trip/' + trip?.id}>
      <div className="p-4 mb-5 border rounded-lg shadow-md hover:scale-105 transition-all ">
        <img
          src={imageUrl}
          alt={location || 'Trip Image'}
          className='object-cover rounded-xl w-full h-48' // Fixed size and object fit
        />
        <div className="mt-3">
          <h2 className='font-bold text-lg'>{location || 'Unknown Location'}</h2>
          <h2>{trip?.userSelection?.noofDays} Days trip with {trip?.userSelection?.budget} budget</h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
