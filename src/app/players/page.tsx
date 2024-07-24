"use client"

import { useEffect, useState } from "react";
import { User } from "../lib/definitions";
import Grid from "@mui/material/Grid";
import Spinner from "../Components/Spinner/spinner";
import Playercard from "./Playercard";

export default function Page() {
  const pagination = 10;
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetPaginatedUsers(offset, pagination);
  }, [offset, pagination]);

  if (loading) return <Spinner />;

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
      setLoading(false); 
    } finally {
      setLoading(false); // End loading
    }
  }

  const handleLoadMore = () => {
    setOffset(prevOffset => prevOffset + pagination);
  };

  return (
    <div>
    <br />
      {data ? (
        <>
        <Grid container justifyContent={"center"} alignItems="left">
          {data.map((user) => (
            <div style={{"padding":"10px"}}>
              <Playercard key={user.id} userName={user.userName} id={user.id} firstName={user.firstName} lastName={user.lastName}/>
            </div>
          ))}
          <br/>
          </Grid>
          <br />
          <Grid container spacing={0} justifyContent={"center"}>
              <button onClick={handleLoadMore} disabled={offset === 0}>Load more</button>
          </Grid>
        </>
      ) : (
        <p>No data available.</p>
      )}
      </div>
  );
}
