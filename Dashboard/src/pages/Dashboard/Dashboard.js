import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../Components/Spinner";
import { getCsgoData, updateData } from "../../features/csgoDataSlice";
import { useParams } from "react-router-dom";
import "./dashboard.css";

function Dashboard() {
  const { csgodata, isLoading, isError, message } = useSelector(
    (state) => state.csgodata
  );
  
  // make whole page a form and then on button click save the data.
  const {user} = useParams();
  const dispatch = useDispatch();

  const handleUpdate = () =>{
    console.log(dispatch(updateData("testing")));
  }
  useEffect(() => {
    dispatch(getCsgoData(user));
  },[dispatch,user]);
  
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    console.log(message);
  }

  if (!csgodata) {
    return <h3>No results found</h3>;
  }

  return (
    <>
    <br/>
    <button onClick={handleUpdate()}></button>
    {/* Personal info */}
      {csgodata ? (
        <section>
          <div className="container rounded bg-white mt-5 mb-5">
          <div className="row">
              <div className="col-md-3 border-right">
                  <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" alt="profile" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"></img><span className="font-weight-bold">FirstName{" "+ csgodata.username +" "}LastName</span></div>
              </div>
              <div className="col-md-5 border-right" style={{"paddingTop":"5em"}}>
                <ul>
                  <li><h4>{csgodata.username}</h4></li>
                  <li><p>{csgodata.email}</p></li>
                  <li><p>{csgodata.country}</p></li>
                </ul>
              </div>
          </div>
      </div>
      </section>
      ) : (
        <>
          <button onClick={handleUpdate()}></button>
          <h3>No settings found</h3>
        </>
        
      )}

      {/* gear */}
      {csgodata ? (
        <>
        <section>
          <div className="container rounded bg-white mt-5 mb-5">
          <div className="row">
              <div className="col-md-5">
                  <div className="p-3 py-5">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                          <h4 className="text-right">Peripherals</h4>
                      </div>
                      <div className="row mt-3">
                          <div className="col-md-12"><label className="labels">Mouse</label><input type="text" className="form-control" placeholder="" defaultValue={csgodata.mouse}></input></div>
                          <div className="col-md-12"><label className="labels">MousePad</label><input type="text" className="form-control" placeholder="" defaultValue={csgodata.mousePad}></input></div>
                          <div className="col-md-12"><label className="labels">KeyBoard</label><input type="text" className="form-control" placeholder="" defaultValue={csgodata.keyBoard}></input></div>
                      </div>
                  </div>
              </div>
              <div className="col-md-5">
                  <div className="p-3 py-5">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                          <h4 className="text-right" style={{"color":"white"}}>Peripherals</h4>
                      </div>
                      <div className="row mt-3">
                          <div className="col-md-12"><label className="labels">HeadSet</label><input type="text" className="form-control" placeholder="" defaultValue={csgodata.headSet}></input></div>
                          <div className="col-md-12"><label className="labels">Monitor</label><input type="text" className="form-control" placeholder="" defaultValue={csgodata.monitor} ></input></div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        </section>

      {/* crosshair settings */}
      <section>
          <div className="container rounded bg-white mt-5 mb-5">
          <div className="row">
              <div className="col-md-5">
                  <div className="p-3 py-5">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                          <h4 className="text-right">Crosshair settings</h4>
                      </div>
                      <div className="row mt-3">
                          <div className="col-md-12"><label className="labels">DPI</label><input type="text" className="form-control" placeholder="" defaultValue={csgodata.dpi}></input></div>
                          <div className="col-md-12"><label className="labels">Sensitivity</label><input type="text" className="form-control" placeholder="" defaultValue={csgodata.sensitivity}></input></div>
                          <div className="col-md-12"><label className="labels">Mouse Accel</label><input type="text" className="form-control" placeholder="" defaultValue="No"></input></div>
                      </div>
                  </div>
              </div>
              <div className="col-md-5">
                  <div className="p-3 py-5">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                          <h4 className="text-right" style={{"color":"white","textAlign":"right"}}>Peripherals</h4>
                      </div>
                      <div className="row mt-3">
                          <div className="col-md-12"><label className="labels">Resolution X</label><input type="text" className="form-control" placeholder="" defaultValue={csgodata.resolutionX}></input></div>
                          <div className="col-md-12"><label className="labels">Resolution Y</label><input type="text" className="form-control" placeholder="" defaultValue={csgodata.resolutionY} ></input></div>
                          <div className="col-md-12"><label className="labels">Type</label><input type="text" className="form-control" placeholder="" defaultValue={csgodata.resolutionType} ></input></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      </section>
      </>
      ) : (
        <h3>No settings found</h3>
      )}    
      </>
  );
}

export default Dashboard;