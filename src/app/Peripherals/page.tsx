"use client"

import { useEffect, useState } from "react";
import { Peripheral, User } from "../lib/definitions";
import Grid from "@mui/material/Grid";
import Spinner from "../Components/Spinner/spinner";
import Playercard from "./Peripheral";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Peripheral[] | null>(null);

  useEffect(() => {
    GetPeripherals();
  }, []);

  if (loading) return <Spinner />;

  async function GetPeripherals(): Promise<void> {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.url}/Data/GetPeripherals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Ensure the response is OK
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the response body only once
      const profileData: Peripheral[] = await response.json();
      setData(profileData); // Update state with profile data
    } catch (error) {
      console.error('Fetch error:', error);
      setLoading(false); 
    } finally {
      setLoading(false); // End loading
    }
  }

  return (
    <div>
    <br />
      {data ? (
        <>
        <Grid container justifyContent={"center"} alignItems="left">
          {data.map((data) => (
            <div style={{"padding":"10px"}}>
              <Playercard key={data.name} type= {data.type} name={data.name} url={data.url}/>
            </div>
          ))}
          <br/>
          </Grid>
        </>
      ) : (
        <p>No data available.</p>
      )}
      </div>
  );
}
