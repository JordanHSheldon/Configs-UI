import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Components/Spinner";
import { getCsgoData, reset } from "../features/csgoDataSlice";
//import EditIcon from '@mui/icons-material/Edit';

function Dashboard() {
  const id = JSON.parse(localStorage.getItem("id"));
  const [formData, setFormData] = useState({steamid: ""})
  const {csgodata, isLoading, isError, message } = useSelector(
    (state) => state.csgodata
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormData(e)
    localStorage.setItem("id",formData.steamid)
  }

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getCsgoData(id));

    return () => {
      dispatch(reset());
    };
  }, [id,navigate,isError,message,dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  // copy register page for items.
  return (
    <>
      <section className="heading">
        <form onSubmit={()=>handleSubmit()}>
          <label>
            <p>SteamID:</p>
            <input onChange={(e) => setFormData({...formData, steamid: e.target.value})} value={formData.steamid} type="text" name="steamid" id="steamid" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </section>
      <section className="content">
        {csgodata ? (
          <div className="stats">
            <p>Player stats for:</p>
            <table>
              <thead></thead>
              <tfoot></tfoot>
              <tbody>
                <tr>
                  <th>KD:</th>
                  <td>{csgodata.KD}</td>
                </tr>
                <tr>
                <th>ADR:</th>
                  <td>{csgodata.ADR}</td>
                </tr>
                <tr>
                <th>Play time:</th>
                  <td>{csgodata.TimePlayed}hrs</td>
                </tr>
                <tr>
                <th>Win Rate:</th>
                  <td>{csgodata.winrate}%</td>
                </tr>
                <tr>
                <th>Headshot:</th>
                  <td>{csgodata.HSP}%</td>
                </tr>
                <tr>
                <th>Accuracy</th>
                  <td>{csgodata.Accuracy}</td>
                </tr>
                <tr>
                <th>MVP:</th>
                  <td>{csgodata.MVP}</td>
                </tr>
                <tr>
                  
                </tr>
            </tbody>
        </table>
          </div>
        ) : (
          <h3>No results found</h3>
        )}
      </section>
      <section className="heading">
        <p>maps</p>
      </section>
      <section className="heading">
        <p>guns</p>
      </section>
      <section className="heading">
        <p>nades</p>
      </section>
    </>
  );
}

export default Dashboard;