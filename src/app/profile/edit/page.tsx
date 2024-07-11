"use client"

import {useEffect, useState } from "react";
import { useCookies } from 'next-client-cookies';
import Spinner from "@/app/Components/Spinner/spinner";
import { Profile } from "@/app/lib/definitions";

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

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setProfile({
          ...profile,
          [name]: value
        });
    };

    async function UpdateProfileData(token: string,data: Profile): Promise<void> {
    setLoading(true);
    try {
        const response = await fetch(`${process.env.url}/Data/UpdateDataById`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
        });

        if (!response.ok) {
        throw new Error('Network response was not ok');
        }

        // update state.
    } catch (error) {
        console.error('Fetch error:', error);
    } finally {
        setLoading(false);
    }
    }

    async function handleUpdate(e: any){
        e.preventDefault();
        if(user != null && profile != null) UpdateProfileData(user,profile);
        else console.log("Error!")
    }

  return (
    <div>
        <form action="/update" method="post">
            
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" required value={profile.firstName} onChange={handleChange}/>

            <label htmlFor="dpi">DPI:</label>
            <input type="text" id="dpi" name="dpi" required value={profile.dpi} onChange={handleChange}/>

            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" required value={profile.lastName} onChange={handleChange}/>

            <label htmlFor="mouse">Mouse:</label>
            <input type="text" id="mouse" name="mouse" required value={profile.mouse} onChange={handleChange}/>

            <label htmlFor="mousePad">Mouse Pad:</label>
            <input type="text" id="mousePad" name="mousePad" required value={profile.mousePad} onChange={handleChange}/>

            <label htmlFor="keyBoard">Keyboard:</label>
            <input type="text" id="keyBoard" name="keyBoard" required value={profile.keyBoard} onChange={handleChange}/>

            <label htmlFor="headSet">Headset:</label>
            <input type="text" id="headSet" name="headSet" required value={profile.headSet} onChange={handleChange}/>

            <label htmlFor="monitor">Monitor:</label>
            <input type="text" id="monitor" name="monitor" required value={profile.monitor} onChange={handleChange}/>
            
            <button type="submit" value="Update" onClick={handleUpdate}>Save</button>
        </form>
    </div>
    );
}
