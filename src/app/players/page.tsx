"use client"

import { useEffect, useState } from "react";
import { Profile } from "../lib/definitions";
import { Container } from "@mui/material";

export default function Page() {
  const [links, setLinks] = useState<Profile[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await GetPaginatedUsers("string", 0);
      setLinks(data);
    }
    fetchData();
  }, []);

  if (!links.length) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="xs">
      <h3>All Players:</h3>
      {links.map((link: any) => (
        <>
        <div key={link.id} >
          <span>
            <h1>{link.userName}</h1>
          </span>
          <span>
            <h1>{link.lastName}</h1>
          </span>
          <span>
            <p>{link.mouse}</p>
          </span>
          </div>
        </>
      ))}
    </Container>
  );
}


async function GetPaginatedUsers(username: string, start: number) {
  const data = {
    username: "string",
    start: 0
  };

  try{
    const response = await fetch(process.env.NEXT_PUBLIC_EC_PLAYERDATA_URL+ '/Data/getAllData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response.json();
  } catch(e){
    console.log(e);
  }
}