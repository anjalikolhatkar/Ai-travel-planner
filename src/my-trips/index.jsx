import { collection, query, where, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user || !user.email) { // Ensure user and user.email are present
      navigate('/');
      return;
    }

    try {
      const q = query(collection(db, 'AITrips'), where('userEmail', '==', user.email));
      const querySnapshot = await getDocs(q);
      const trips = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserTrips(trips);
    } catch (error) {
      console.error('Error fetching user trips:', error);
    }
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-extrabold text-6xl text-[#5e42db] text-center'>MY TRIPS</h2>
      <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
        {userTrips.map((trip) => (
          <UserTripCardItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
}

export default MyTrips;
