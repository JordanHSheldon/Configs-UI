"use client"

import { useEffect, useState } from "react";
import { Profile } from "../lib/definitions";
import { useCookies } from 'next-client-cookies';
import './profile.css'
import Spinner from "../Components/Spinner/spinner";

export default function Page() {
  
  const cookieStore = useCookies();
  const user = cookieStore.get('user');
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    if (user) {
      GetProfileData(user);
    } else {
      setLoading(false);
    }
  }, [user]);
 
  if (isLoading) return <Spinner />
  if (!profile) return <p>No profile data</p>

  async function GetProfileData(token: string): Promise<void> {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.url}/Data/GetUserProfile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const profileData: Profile = await response.json();
      setProfile(profileData);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <img src=""></img>
      <div>
        <div>
          <h1>{profile.userName}</h1>
          <button>Edit</button>
        </div>
        <div>
          <h2>{profile.firstName} {profile.lastName}</h2>
        </div>
      </div>
      <hr />
    </div>
);
}

