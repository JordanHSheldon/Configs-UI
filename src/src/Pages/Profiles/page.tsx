import { useEffect, useState } from "react";
import { Profile } from "../../lib/definitions";
import ProfileCard from "./Profilecard";
import Spinner from "../../Components/Spinner/spinner";
import './players.css'

export default function Players() {
  const pagination = 10;
  const [data, setData] = useState<Profile[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetPaginatedUsers(0, pagination);
  }, [pagination]);

  if (loading) return <div><Spinner /></div>;
  if (!data) return <p>No data, check back later</p>

  async function GetPaginatedUsers(offset: number, limit: number): Promise<void> {
    setLoading(true);
    try {
      const request = {
        Offset: offset,
        Limit: limit
      };

      const response = await fetch(import.meta.env.VITE_API_URL+'api/Data/GetPaginatedUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const profileData: Profile[] = await response.json();
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
        <div>
          {data.map((profile) => (
              <ProfileCard id={profile.id} key={profile.userName} userName={profile.userName} mouse={""} mousePad={""} keyBoard={""} headSet={""} monitor={""}/>
          ))}
          </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}
