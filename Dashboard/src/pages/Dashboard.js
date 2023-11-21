import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Components/Spinner";
import { getCsgoData } from "../features/csgoDataSlice";
import {useParams} from "react-router-dom";

function Dashboard() {
  const {csgodata, isLoading, isError, message } = useSelector(
    (state) => state.csgodata
  );

  const {taco} = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (csgodata !== true && !isLoading && !isError) {
      dispatch(getCsgoData(taco));
    }
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Error: {message}</h3>;
  }

  if (!csgodata) {
    return <h3>No results found</h3>;
  }

  // copy register page for items.
  return (
    <>
      <section className="content">
        <section>
          
        {csgodata.settingsResponse && csgodata.peripheralsResponse ? (
          <>
          <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Resolution</th>
                    <th>Display type</th>
                    <th>sensitivity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{csgodata.username}</td>
                    <td>{csgodata.settingsResponse.resolutionX ?? "N/A"} x {csgodata.settingsResponse.resolutionY ?? "N/A"}</td>
                    <td>{csgodata.settingsResponse.resolutionType ?? "N/A"}</td>
                    <td>{csgodata.settingsResponse.sensitivity ?? "N/A"}</td>
                  </tr>
                </tbody>
          </table>
          </>
        ) : (
          <h3>No results found</h3>
        )}
        </section>
        <section>
          


        {csgodata.settingsResponse && csgodata.peripheralsResponse ? (
        <table>
                <thead>
                  <tr>
                    <th>Mouse Pad</th>
                    <th>Keyboard</th>
                    <th>Headset</th>
                    <th>Monitor</th>
                    <th>Mouse</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{csgodata.peripheralsResponse.mousePad ?? "N/A"}</td>
                    <td>{csgodata.peripheralsResponse.keyBoard ?? "N/A"}</td>
                    <td>{csgodata.peripheralsResponse.headSet ?? "N/A"}</td>
                    <td>{csgodata.peripheralsResponse.monitor ?? "N/A"}</td>
                    <td>{csgodata.peripheralsResponse.mouse ?? "N/A"}</td>
                  </tr>
                </tbody>
          </table>

        ) : (
          <h3>No results found</h3>
        )}
        </section>
      </section>
    </>
  );
}

export default Dashboard;