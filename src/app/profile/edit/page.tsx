"use client"

import {useEffect, useState } from "react";
import { useCookies } from 'next-client-cookies';
import Spinner from "@/app/Components/Spinner/spinner";
import { Profile } from "@/app/lib/definitions";
import './styles.css'

export default function Page() {
    const cookieStore = useCookies();
    const user = cookieStore.get('user');
    const [profile, setProfile] = useState<Profile | null>(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    // const [dpi, setDpi] = useState(profile?.dpi);
    const [mouse, setMouse] = useState("");
    const [mousePad, setMousePad] = useState("");
    const [keyboard, setKeyboard] = useState("");
    const [headset, setHeadset] = useState("");
    const [monitor, setMonitor] = useState("");
    // const [twitter, setTwitter] = useState('https://twitter.com/username');
    // const [instagram, setInstagram] = useState('https://instagram.com/username');
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
      if (user) {
        GetProfileData(user);
      } else {
        setLoading(false);
      }
    }, [user]);
   
    useEffect(() => {
        if (profile) {
            // Set initial values from profile if it exists
            setFirstName(profile.firstName ?? '');
            setLastName(profile.lastName ?? '');
            setMouse(profile.mouse ?? '');
            setMousePad(profile.mousePad ?? '');
            setKeyboard(profile.keyBoard ?? '');
            setHeadset(profile.headSet ?? '');
            setMonitor(profile.monitor ?? '');
        }
    }, [profile]);

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

    async function UpdateProfileData(): Promise<void> {
    setLoading(true);
    const data: Profile = {
        id: "",
        userName: profile?.userName ?? "",
        firstName: firstName ?? profile?.firstName ?? "",
        email: profile?.email ?? "default@email.com",
        dpi: 0,
        lastName: lastName ?? profile?.lastName ?? "",
        mouse: mouse ?? profile?.mouse ?? "",
        mousePad: mousePad ?? profile?.mousePad ?? "",
        keyBoard: keyboard ?? profile?.keyBoard ?? "",
        headSet:  headset ?? profile?.headSet ?? "",
        monitor:  monitor ?? profile?.monitor ?? "",
    }
    try {
        const response = await fetch(`${process.env.url}/Data/UpdateDataById`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user
        },
        body: JSON.stringify(data)
        });
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }

    } catch (error) {
        console.error('Fetch error:', error);
    } finally {
        setLoading(false);
    }
    }

  return (
    <div className="profile">
    <div className="header">
        <h1>Edit User Profile</h1>
        <button className="save-btn" onClick={UpdateProfileData}>Save</button>
    </div>

    {/* Connections section */}
    {/* <div className="edit-section">
        <h2>Connections</h2>
        <div className="edit-field">
            <label>Twitter:</label>
            <input
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
            />
        </div>
        <div className="edit-field">
            <label>Instagram:</label>
            <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
            />
        </div>
    </div> */}

    {/* Personal details section */}
    <div className="edit-section">
        <h2>Personal Details</h2>
        <div className="edit-field">
            <label>First Name:</label>
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
        </div>
        <div className="edit-field">
            <label>Last Name:</label>
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
        </div>
    </div>

    {/* Peripherals section */}
    <div className="edit-section">
        <h2>Peripherals</h2>
        {/* <div className="edit-field">
            <label>DPI:</label>
            <input
                type="number"
                value={keyboard}
                onChange={(e) => setDpi(e.target.value)}
            />
        </div> */}
        <div className="edit-field">
            <label>Mouse:</label>
            <input
                type="text"
                value={mouse}
                onChange={(e) => setMouse(e.target.value)}
            />
        </div>
        <div className="edit-field">
            <label>Mousepad:</label>
            <input
                type="text"
                value={mousePad}
                onChange={(e) => setMousePad(e.target.value)}
            />
        </div>
        <div className="edit-field">
            <label>Keyboard:</label>
            <input
                type="text"
                value={keyboard}
                onChange={(e) => setKeyboard(e.target.value)}
            />
        </div>
        <div className="edit-field">
            <label>Headset:</label>
            <input
                type="text"
                value={headset}
                onChange={(e) => setHeadset(e.target.value)}
            />
        </div>
        <div className="edit-field">
            <label>Monitor:</label>
            <input
                type="text"
                value={monitor}
                onChange={(e) => setMonitor(e.target.value)}
            />
        </div>
    </div>
</div>
);
}
