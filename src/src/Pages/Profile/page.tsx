import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store";
import './profile.css'

export default function Profile() {
  const { profile } = useUserStore();
  const { getUser } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    if(profile === undefined){
      getUser();
    }
  }, [getUser,navigate,profile]);
 
  if (profile === undefined) return <p style={{'color': 'rgb(198, 196, 196)','padding':'10em'}}>No profile data, check back later</p>

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