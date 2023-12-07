import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../Components/Spinner";
import { getCsgoData } from "../../features/csgoDataSlice";
import { useParams } from "react-router-dom";
import "./dashboard.css";

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
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Error: {message}</h3>;
  }

  if (!csgodata) {
    return <h3>No results found</h3>;
  }

  return (
    <>
    <br/>
    {/* Personal info */}
      {csgodata ? (
        <section>
          <div className="container rounded bg-white mt-5 mb-5">
          <div className="row">
              <div className="col-md-3 border-right">
                  <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" alt="profile" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"></img><span className="font-weight-bold">FirstName{" "+ csgodata.username +" "}LastName</span></div>
              </div>
              <div className="col-md-5 border-right">
              
              </div>
              <div className="col-md-4">
              </div>
          </div>
      </div>
      </section>
      ) : (
        <h3>No settings found</h3>
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
                          <div className="col-md-12"><label className="labels">Mouse</label><input type="text" className="form-control" placeholder="" defaultValue={csgodata.mouse}></input></div>
                          <div className="col-md-12"><label className="labels">MousePad</label><input type="text" className="form-control" placeholder="" defaultValue={csgodata.mousePad}></input></div>
                          <div className="col-md-12"><label className="labels">KeyBoard</label><input type="text" className="form-control" placeholder="" defaultValue={csgodata.keyBoard}></input></div>
                      </div>
                  </div>
              </div>
              <div className="col-md-5">
                  <div className="p-3 py-5">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                          <h4 className="text-right" style={{"color":"white","textAlign":"right"}}>Peripherals</h4>
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
      </>
      ) : (
        <h3>No settings found</h3>
      )}    
    </>
  );
}

export default Dashboard;