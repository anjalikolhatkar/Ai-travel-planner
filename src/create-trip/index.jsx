import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelsList, AI_PROMPT } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { chatSession } from '@/service/AIModal';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { Navigate, useNavigate } from 'react-router-dom';



function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    if (formData.noofDays) {
      const sanitizedNoofDays = Math.max(1, Math.min(10, parseInt(formData.noofDays, 10)));
      setFormData({
        ...formData,
        noofDays: sanitizedNoofDays,
      });
    }
  }, [formData.noofDays]);
  

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      console.log(response);
      GetUserProfile(response, setOpenDialog, setLoading, OnGenerateTrip);
    },
    onError: (error) => console.log(error),
  });
  const GetUserProfile = async (tokenInfo, setOpenDialog, setLoading, OnGenerateTrip) => {
    try {
      const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + tokenInfo.access_token, {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: 'application/json'
        }
      });
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpenDialog(false); // Close the dialog on successful login
      OnGenerateTrip();
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');
  
    if (!user) {
      setOpenDialog(true);
      return;
    }
  
    // Validate form data
    const noofDays = parseInt(formData.noofDays, 10);
    if (!formData.location || !noofDays || noofDays < 1 || noofDays > 10 || !formData.budget || !formData.travellers) {
      toast("Please enter all details with valid values (1-10 days).");
      return;
    }
  
    setLoading(true);
  
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData.location?.label)
      .replace('{totalDays}', formData.noofDays)
      .replace('{travellers}', formData.travellers)
      .replace('{budget}', formData.budget);
  
    console.log(FINAL_PROMPT);
  
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    setLoading(false);
    SaveAiTrip(result.response.text());
  };
  

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
  
    try {
      // Inspect the data before parsing
      console.log("Raw Trip Data:", TripData);
      const parsedTripData = JSON.parse(TripData); // This is where the error occurs
  
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: parsedTripData,
        userEmail: user?.email,
        id: docId,
      });
  
      setLoading(false);
      navigate('/view-trip/' + docId);
    } catch (error) {
      console.error('Error saving trip:', error);
      toast.error("Failed to save trip. Please try again.");
      setLoading(false);
    }
  };
  

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-extrabold text-6xl text-[#5e42db]'>Tell us about your Travel Preference!</h2>
      <p className='mt-3 text-gray-500 text-xl'>We are excited to help you plan your next adventure. Please provide some basic information about your travel preferences so we can tailor our recommendations to suit your needs. Whether you're looking for a relaxing beach getaway, an adventurous mountain trek, or an immersive cultural experience, your preferences will guide us in creating the perfect trip for you.</p>
      <div>
        <div className='mt-10 flex flex-col gap-5'>
          <h2 className='text-xl my-3 font-medium'>What is your destination?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v); },
            }}
          />
        </div>
        <div>
          <h2 className='text-xl my-4 font-medium'>How many Days are you planning to travel?</h2>
          <Input
  placeholder={"1-10 days"}
  type="number"
  min="1"
  max="10"
  onChange={(e) => {
    // Validate input value here
    const value = Math.max(1, Math.min(10, e.target.value));
    handleInputChange('noofDays', value);
  }}
/>

          <h2 className='text-xl my-3 font-medium mt-8'>What is your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-6'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData.budget === item.title && 'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-800'>{item.desc}</h2>
              </div>
            ))}
          </div>
          <h2 className='text-xl my-3 font-medium mt-8'>Who are you travelling with?</h2>
          <div className='grid grid-cols-3 gap-5 mt-6'>
            {SelectTravelsList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('travellers', item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData.travellers === item.people && 'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-800'>{item.desc}</h2>
                <h2 className='text-sm text-gray-800'>{item.people}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='my-10 justify-center flex'>
        <Button
          disabled={loading}
          onClick={OnGenerateTrip}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
