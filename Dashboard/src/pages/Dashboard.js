import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Components/Spinner";
import { getCsgoData, reset } from "../features/csgoDataSlice";
import { getSettingsData } from "../features/settingsDataSlice";
//import EditIcon from '@mui/icons-material/Edit';

function Dashboard() {
  const {csgodata, isLoading, isError, message } = useSelector(
    (state) => state.csgodata
  );

  const {settingsdata, isSettingsLoading, isSettingsError, settingsMessage } = useSelector(
    (state) => state.settingsdata
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) { console.log(message);}
    dispatch(getCsgoData(3));
    dispatch(getSettingsData(3));

    return () => {
      dispatch(reset())
    };
  }, [navigate, isSettingsError, settingsMessage, isError, message, dispatch]);

  if (isLoading || isSettingsLoading) {
    return <Spinner />;
  }
  
  return (
    <>
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
        <p>Settings:</p>
        {settingsdata ? (
          <div className="stats">
            <p>Player stats for:</p>
            <table>
              <thead></thead>
              <tfoot></tfoot>
              <tbody>
                <tr>
                  <th>KD:</th>
                  <td>{settingsdata.Dpi}</td>
                </tr>
                <tr>
                <th>ADR:</th>
                  <td>{settingsdata.Sensitivity}</td>
                </tr>
                <tr>
                <th>Play time:</th>
                  <td>{settingsdata.ResolutionX}hrs</td>
                </tr>
                <tr>
                <th>Win Rate:</th>
                  <td>{settingsdata.ResolutionY}%</td>
                </tr>
                <tr>
                <th>Headshot:</th>
                  <td>{settingsdata.ResolutionType}%</td>
                </tr>
                <tr>
                <th>Accuracy</th>
                  <td>{settingsdata.peripheralsResponse}</td>
                </tr>
                <tr>
                <th>MVP:</th>
                  <td>{settingsdata.settingsResponse}</td>
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
        <p>guns</p>
      </section>
      <section className="heading">
        <p>nades</p>
      </section>
    </>
  );
}

export default Dashboard;