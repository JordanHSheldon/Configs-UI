import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Components/Spinner";
import { getSettings, reset } from "../features/settingsSlice";
import { getPeripherals } from "../features/peripheralsSlice";
//import EditIcon from '@mui/icons-material/Edit';

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const { settings, isLoading, isError, message } = useSelector(
    (state) => state.settings
  );

  const {
    peripherals,
    isPeripheralLoading
  } = useSelector((state) => state.peripherals);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getPeripherals(user));
    dispatch(getSettings(user));

    return () => {
      dispatch(reset());
    };
  }, [user,navigate,isError,message,dispatch]);

  if (isLoading || isPeripheralLoading) {
    return <Spinner />;
  }
  // copy register page for items.
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.alias}</h1>
        <p></p>
      </section>

      <section className="content">
        {settings ? (
          <div className="settings">
            <table>
              <tbody>
                <tr>
                  <td>
                    Sensitivity: <span> {settings.sensitivity}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    DPI: <span>{settings.dpi}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    Resolution:
                    <span>
                      {settings.resolutionX}x{settings.resolutionY}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    Resolution Type: <span> {settings.resolutionType}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <h3>You have no settings!</h3>
        )}
      </section>
      <section>
        {peripherals ? (
          <div className="perihperals">
            <table>
              <tbody>
                <tr>
                  <td>
                    Mouse: <span> {peripherals.mouse}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    Keyboard: <span> {peripherals.keyBoard}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    MousePad: <span> {peripherals.mousePad}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    Monitor: <span> {peripherals.monitor}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    Headset: <span> {peripherals.headSet}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <h3>You have no peripherals!</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;

/* <button onClick={}>
<EditIcon />
</button> */