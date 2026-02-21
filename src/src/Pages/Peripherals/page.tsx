import { useEffect, useState } from "react";
import { Peripheral } from "../../lib/definitions";
import Spinner from "../../Components/Spinner/spinner";
import NoDataFound from "../../Components/NoData/NoDataFound";
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

  if (loading) return <Spinner />
  if (!data) return <NoDataFound />

  async function GetPeripherals(): Promise<void> {
    setLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_API_URL+'api/Peripheral/GetPeripherals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const peripherals: Peripheral[] = await response.json();
      setData(peripherals);
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

  const filteredData = data?.filter((peripheral) => {
    if(filters.type === '') return peripheral.name.toLowerCase().includes(filters.name.toLowerCase());

    return (
      peripheral.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      peripheral.type.toLowerCase() === filters.type.toLowerCase()
    );
  });

  const styles = {
    container: {
      display: "flex",
      height: "100vh",
      width: "100vw",
      background: "#111",
      overflow: "auto",
    },
    sidebar: {
      width: "15%",
      minWidth: "220px",
      background: "#111",
      color: "white",
      padding: "1rem",
    },
    content: {
      flex: 1,
      overflowY: "auto",
      overflowX: "hidden",
      paddingLeft: "1.5rem",
    },
  } as const;

  return (
    <div style={{overflow:"hidden"}}>
      <div style={styles.container}>
      <aside style={styles.sidebar}>
        <div className="filter-row">
        <label htmlFor="peripheral-name">Name</label>
        <input
          id="peripheral-name"
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          placeholder="search..."
        />
        </div>
        <div className="filter-row">
          <label htmlFor="dropdown">Type</label>
          <select
            id="peripheral-type"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All</option>
            {[...new Set(data.filter(p => p.type !== "Default").map(p => p.type))].map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </aside>
      <main style={styles.content}>
        <table>
        <thead>
          <tr>
            <th className="name">Name</th>
          </tr>
        </thead>
        <tbody>
        {filteredData.map((peripheral) => (
            <tr key={peripheral.id}>
              <td><a target="_blank" href={peripheral?.url ?? "#"}>{peripheral.name}</a></td>
            </tr>
          ))
        }
        </tbody>
      </table>
      </main>
      </div>
    </div>
  );
};
