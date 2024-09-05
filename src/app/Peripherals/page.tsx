"use client"

import { useEffect, useState } from "react";
import { Peripheral } from "../lib/definitions";
import Grid from "@mui/material/Grid";
import Spinner from "../Components/Spinner/spinner";
import PeripheralCard from "./PeripheralCard";
import './peripherals.css'
export default function Page() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Peripheral[] | null>(null);

  useEffect(() => {
    GetPeripherals();
  }, []);

  if (loading) return <div style={{'color': 'rgb(198, 196, 196)','padding':'10em'}}><Spinner /></div>;
  if (!data) return <p style={{'color': 'rgb(198, 196, 196)','padding':'10em'}}>No data, check back later</p>

  async function GetPeripherals(): Promise<void> {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.url}/Data/GetPeripherals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const profileData: Peripheral[] = await response.json();
      setData(profileData);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {data ? (
        <Grid container justifyContent={"center"} alignItems="left">
          {data.map((data) => (
            <div style={{"padding":"10px"}}>
              <PeripheralCard key={data.name} type= {data.type} name={data.name} url={data.url}/>
            </div>
          ))}
          <br/>
          </Grid>
      ) : (
        <p>No data available.</p>
      )}
      </div>
  );
}
