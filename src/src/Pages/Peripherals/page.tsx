import { useEffect, useState } from "react";
import { Peripheral } from "../../lib/definitions";
import './peripherals.css'
import Spinner from "../../Components/Spinner/spinner";
import PeripheralCard from "./PeripheralCard";

export default function Peripherals() {
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
      const response = await fetch('https://localhost:7191/api/Data/GetPeripherals', {
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
      {data?.map((peripheral) => (
        <PeripheralCard key={peripheral.id} {...peripheral} />
      ))}
    </div>
  );
}
