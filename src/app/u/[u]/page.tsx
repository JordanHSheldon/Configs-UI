"use client"

import Spinner from '@/app/Components/Spinner/spinner';
import { Profile } from '@/app/lib/definitions';
import { Container} from '@mui/material';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const UserProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      const pathItems = pathname.split("/");
      GetProfileData(pathItems[pathItems.length - 1]);
    } else {
      setLoading(false);
    }
  }, [pathname]);
 
  if (isLoading) return <Spinner />
  if (!profile) return <p>No profile data</p>

  async function GetProfileData(username: string): Promise<void> {
    setLoading(true);
    try {
      let request = {
        username: username
      }
      
      const response = await fetch(`${process.env.url}/Data/GetDataByUserName`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });

      // Ensure the response is OK
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the response body only once
      const profileData: Profile = await response.json();
      setProfile(profileData);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
        <h1>{profile.userName}: {profile.firstName} {profile.lastName}</h1>
    </main>
  );
};

export default UserProfile;
