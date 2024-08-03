"use client"

import { useEffect, useState } from "react";
import { Profile } from "../../lib/definitions"
import { useCookies } from 'next-client-cookies';
import './profile.css'
import Spinner from "../../Components/Spinner/spinner";
import { useParams } from "next/navigation";
import { json } from "stream/consumers";

export default function Page() {
  const cookieStore = useCookies();
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setLoading] = useState(true)
  const params = useParams();
  
  useEffect(() => {
    if (params["u"]) {
      GetProfileData(params["u"]);
    } else {
      setLoading(false);
    }
  }, []);
 
  if (isLoading) return <Spinner />
  if (!profile) return <p>No profile data, check back later</p>

  async function GetProfileData(username: string | string[]): Promise<void> {
    setLoading(true);
    let data = {
      Username: username
    }
    try {
      const response = await fetch(`${process.env.url}/Data/GetDataByUserName`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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
    <>
      <div className="profile">
          <div className="profile-info">
              <div className="profile-picture">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb51ZwKCKqU4ZrB9cfaUNclbeRiC-V-KZsfQ&s" alt="Profile Picture" />
                  <div className="connections">
                      {/* <a href="https://twitter.com/username" target="_blank">Twitter</a>
                      <a href="https://instagram.com/username" target="_blank">Instagram</a> */}
                  </div>
              </div>
              <div className="user-details">
                <h2>{profile?.userName}</h2>
                <p>{profile?.firstName} {profile?.lastName}</p>
              </div>
          </div>

          <br />
          <hr />
          <br />

          {/* Perihperals section */}
          <div className="additional-section">
              <h1>Peripherals</h1>
              <div className="additional-info">
                  <div className="additional-info-item">
                      <span className="info-label">Mouse:</span>
                      <span className="info-value">{profile?.mouse}</span>
                  </div>
                  <div className="additional-info-item">
                      <span className="info-label">MousePad:</span>
                      <span className="info-value">{profile?.mousePad}</span>
                  </div>
                  <div className="additional-info-item">
                      <span className="info-label">Keyboard:</span>
                      <span className="info-value">{profile?.keyBoard}</span>
                  </div>
                  <div className="additional-info-item">
                      <span className="info-label">Headset:</span>
                      <span className="info-value">{profile?.headSet}</span>
                  </div>
                  <div className="additional-info-item">
                      <span className="info-label">Monitor:</span>
                      <span className="info-value">{profile?.monitor}</span>
                  </div>
              </div>
          </div>

          <br />
          <hr />
          <br />

          {/* Another section below additional information */}
          <div className="more-section">
              
          </div>
          <br />
      </div>
  </>
);
}