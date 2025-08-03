import { useEffect, useState } from "react";
import { Peripheral } from "../../lib/definitions";
import Spinner from "../../Components/Spinner/spinner";
import './peripherals.css'

export default function Peripherals() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Peripheral[] | null>(null);

  useEffect(() => {
    GetPeripherals();
  }, []);

  const [filters, setFilters] = useState({
    name: '',
    type: '',
  });

  if (loading) return <div style={{'color': 'rgb(198, 196, 196)','padding':'10em'}}><Spinner /></div>;
  if (!data) return <p style={{'color': 'rgb(198, 196, 196)','padding':'10em'}}>No data, check back later</p>

  async function GetPeripherals(): Promise<void> {
    setLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_API_URL+'api/Data/GetPeripherals', {
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


  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredData = data.filter((peripheral) => {
    return (
      peripheral.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      peripheral.type.toLowerCase().includes(filters.type.toLowerCase())
    );
  });

  return (
    <div>
      {/* Filter Inputs */}
      <div>
      <label htmlFor="dropdown">Peripheral Name:</label>
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          placeholder="search..."
        />
        <label htmlFor="dropdown">Peripheral Type:</label>
        <select id="dropdown" value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
          <option value="">All</option>
          <option value="Keyboard">Keyboard</option>
          <option value="Mouse">Mouse</option>
          <option value="Monitor">Monitor</option>
          <option value="Printer">Printer</option>
          <option value="Speaker">Speaker</option>
        </select>
      </div>

      <hr />
      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((peripheral) => (
              <tr key={peripheral.id}>
                <td>{peripheral.type}</td>
                <td><a target="_blank" href={peripheral.url}>{peripheral.name}</a></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
