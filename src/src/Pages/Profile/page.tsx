import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store";
import { useState } from "react";
import './profile.css'

export default function Profile() {
  const { profile } = useUserStore();
  const { getUser } = useUserStore();
  const navigate = useNavigate();

  const [tab,setTab] = useState(1);

  useEffect(() => {
    if(profile === undefined){
      getUser();
    }
  }, [getUser,navigate,profile]);
 
  const toggleTab = (tabId: number) => {
    setTab(tabId);
  }

  // async function EditProfileData(): Promise<void> {
  //   navigate("/edit");
  // }

  if (profile === undefined) return <p style={{'color': 'rgb(198, 196, 196)','padding':'10em'}}>No profile data, check back later</p>

  return (
    <div className="profile">
      <div className="profile-header">
          <div className="profile-picture">
            {/* <img src="dasdas.pdj"></img> */}
            <p>{profile?.userName}</p>
          </div> 
      </div>
       <div>
        <div className="tabs">
          <div className={tab === 1 ? "tab active" : "tab"} onClick={()=>toggleTab(1)}>Configs</div>
          <div className={tab === 2 ? "tab active" : "tab"} onClick={()=>toggleTab(2)}>Stats</div>
        </div>

        <div className={tab === 1 ? "tab-content active" : "tab-content"}>
          <table>
            <tr>
              <th>Mouse</th>
              <td>{profile?.mouse}</td>
            </tr>
            <tr>
              <th>Mousepad</th>
              <td>{profile?.mousePad}</td>
            </tr>
            <tr>
              <th>Keyboard</th>
              <td>{profile?.keyBoard}</td>
            </tr>
            <tr>
              <th>Monitor</th>
              <td>{profile?.monitor}</td>
            </tr>
            <tr>
              <th>Headset</th>
              <td>{profile?.headSet}</td>
            </tr>
          </table>
        </div>
        <div className={tab === 2 ? "tab-content active" : "tab-content"}>
          <p>Statistics coming soon...</p>
        </div>
      </div>
    </div>
  );
}