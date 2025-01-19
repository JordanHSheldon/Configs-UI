import { useEffect, useState } from "react";
import { ProfileType } from "../../lib/definitions";
import { useCookies } from "react-cookie";
import Spinner from "../../Components/Spinner/spinner";
import { useNavigate } from "react-router-dom";
import './profile.css'

export default function Profile() {
  const [profile, setProfile] = useState<ProfileType | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [cookies] = useCookies(['user']);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies?.user) {
      navigate("/");
    }

    GetProfileData(cookies?.user);
  }, [cookies, navigate]);
 
  if (isLoading) return <div style={{'color': 'rgb(198, 196, 196)','padding':'10em'}}><Spinner /></div>
  if (!profile) return <p style={{'color': 'rgb(198, 196, 196)','padding':'10em'}}>No profile data, check back later</p>

  async function GetProfileData(token: string): Promise<void> {
    setLoading(true);
    try {
      const response = await fetch('https://localhost:7191/api/Data/GetUserProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const profileData: ProfileType = await response.json();
      setProfile(profileData);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function EditProfileData(): Promise<void> {
    navigate("/edit");
  }

  return (
    <div className="profile">
      <button onClick={()=>EditProfileData()}>Edit</button>
      <h1>Peripherals</h1>
      <div>
          <span>Mouse: </span>
          <span>{profile?.mouse}</span>
      </div>
      <div>
          <span>MousePad: </span>
          <span>{profile?.mousePad}</span>
      </div>
      <div>
          <span>Keyboard: </span>
          <span>{profile?.keyBoard}</span>
      </div>
      <div>
          <span>Headset: </span>
          <span>{profile?.headSet}</span>
      </div>
    </div>
  );
}