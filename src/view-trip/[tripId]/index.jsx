import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { db } from '@/service/firebaseConfig'; // Assuming you have a firebaseConfig file
import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([])
  useEffect(() => {

    const GetTripData = async () => {
      try {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document:", docSnap.data());
          setTrip(docSnap.data());
        } else {
          console.log("No Such Document Found");
          toast('No trip found!');
        }
      } catch (error) {
        console.error("Error getting trip data:", error);
        toast('Failed to fetch trip data');
      }
    };

    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

    return (
    <div className='p-12 md:px-20 lg:px-44  '>
      <InfoSection trip = {trip} />
      <Hotels trip = {trip} />
      <PlacesToVisit trip ={trip} />
    </div>
  )
}

export default ViewTrip