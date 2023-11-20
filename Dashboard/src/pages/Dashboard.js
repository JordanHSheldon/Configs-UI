import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Components/Spinner";
import { getCsgoData } from "../features/csgoDataSlice";

function Dashboard() {

  const {csgodata, isLoading, isError, message } = useSelector(
    (state) => state.csgodata
  );

  // const {taco} = useParams();// this gets the parameter from the url || import {useParams} from "react-router-dom";
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log(message);
    } 
    else if (!isLoading) {
      dispatch(getCsgoData(3));
    }
  }, [dispatch,isError,isLoading,message]);

  if (isLoading) {
    return <Spinner />;
  }

  // copy register page for items.
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
    </>
  );
}

export default Dashboard;