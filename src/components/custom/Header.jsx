import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { CiUser } from "react-icons/ci";
import axios from 'axios';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";

function Header() {
  const user = localStorage.getItem('user');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log('User:', user);
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      console.log('Google login successful:', response);
      await GetUserProfile(response);
    },
    onError: (error) => console.log('Google login error:', error),
  });

  const GetUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + tokenInfo.access_token, {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: 'application/json',
        },
      });
      console.log('User profile:', response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpenDialog(false); // Close the dialog on successful login
      window.location.reload();
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <a href='/'>
      <img src="/logo.svg" alt="Logo" />
      </a>
      <div>
        {user ? (
          <div className='flex items-center gap-3'>
            <a href = '/my-trips'>
            <Button>My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <CiUser className='h-[35px] w-[35px] rounded-full' />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className='cursor-pointer'
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Click to Logout.
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
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

export default Header;
