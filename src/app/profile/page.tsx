"use client"

import { useEffect, useState } from "react";
import { Profile } from "../lib/definitions";
import { useCookies } from 'next-client-cookies';
import { Box, Container, Typography } from "@mui/material";

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
 
  if (isLoading) return <p>Loading...</p>
  if (!profile) return <p>No profile data</p>

  async function GetProfileData(token: string): Promise<void> {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${process.env.url}/Data/GetUserProfile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });

      // Ensure the response is OK
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the response body only once
      const profileData: Profile = await response.json();
      setProfile(profileData); // Update state with profile data
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false); // End loading
    }
  }
  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {profile.firstName}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {profile.userName}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {profile.lastName}
        </Typography>
      </Box>
    </Container>
  );
}

