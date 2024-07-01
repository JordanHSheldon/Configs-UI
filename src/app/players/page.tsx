"use client"

import { useEffect, useState } from "react";
import { User } from "../lib/definitions";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Grid from "@mui/material/Grid";
import Link from "next/link";

export default function Page() {
  const pagination = 10;
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetPaginatedUsers(offset, pagination);
  }, [offset, pagination]);

  if (loading) return <p>Loading...</p>;

  async function GetPaginatedUsers(offset: number, limit: number): Promise<void> {
    setLoading(true);
    try {
      let request = {
        Offset: offset,
        Limit: limit
      };

      const response = await fetch(`${process.env.url}/Data/GetPaginatedUserData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      });

      // Ensure the response is OK
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the response body only once
      const profileData: User[] = await response.json();
      setData(profileData); // Update state with profile data
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false); // End loading
    }
  }

  const handleNext = () => {
    setOffset(prevOffset => prevOffset + pagination);
  };

  const handlePrevious = () => {
    setOffset(prevOffset => (prevOffset - pagination < 0 ? 0 : prevOffset - pagination));
  };

  return (
    <div>
    <br />
      {data ? (
        <>
        <Grid container justifyContent={"center"}  alignItems="center">
          {data.map((user) => (
            <Grid container alignItems="center" spacing={0} direction="column" key={user.id}>
              <h2>{user?.firstName}</h2> <Link href={"/user/"+user?.userName}>{user?.userName}</Link> <h2>{user?.lastName}</h2>
            </Grid>
          ))}
          <br/>
          </Grid>
          <br />
          <Grid container spacing={0} justifyContent={"center"}>
            <span>
              <button onClick={handlePrevious} disabled={offset === 0}><KeyboardArrowLeftIcon/></button>
              <button onClick={handleNext}><ChevronRightIcon /></button>
            </span>
          </Grid>
        </>
      ) : (
        <p>No data available.</p>
      )}
      </div>
  );
}
