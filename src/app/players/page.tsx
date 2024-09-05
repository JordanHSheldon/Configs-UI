"use client"

import { useEffect, useState } from "react";
import { User } from "../lib/definitions";
import Grid from "@mui/material/Grid";
import Spinner from "../Components/Spinner/spinner";
import Playercard from "./Playercard";
import './players.css'

export default function Page() {
  const pagination = 10;
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetPaginatedUsers(offset, pagination);
  }, [offset, pagination]);

  if (loading) return <div style={{'color': 'rgb(198, 196, 196)','padding':'10em'}}><Spinner /></div>;
  if (!data) return <p style={{'color': 'rgb(198, 196, 196)','padding':'10em'}}>No data, check back later</p>

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

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const profileData: User[] = await response.json();
      setData(profileData);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="playerspage">
      {data ? (
        <Grid container justifyContent={"center"} alignItems="left">
          {data.map((user) => (
            <div style={{"padding":"10px"}}>
              <Playercard key={user.id} userName={user.userName} id={user.id} firstName={user.firstName} lastName={user.lastName}/>
            </div>
          ))}
          </Grid>
      ) : (
        <p>No data available.</p>
      )}
      </div>
  );
}
