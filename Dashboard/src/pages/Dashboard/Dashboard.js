import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../Components/Spinner";
import { getCsgoData } from "../../features/csgoDataSlice";
import {useParams} from "react-router-dom";
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

  return (
    <>
    <br/>
    {/* Personal info */}
      {csgodata ? (
        <section>
          <div class="container rounded bg-white mt-5 mb-5">
          <div class="row">
              <div class="col-md-3 border-right">
                  <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" alt="profile" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"></img><span class="font-weight-bold">{'FirstName' +' '+ csgodata.username +' '+  'lastName'}</span></div>
              </div>
              <div class="col-md-5 border-right">
              
              </div>
              <div class="col-md-4">
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
          <div class="container rounded bg-white mt-5 mb-5">
          <div class="row">
              <div class="col-md-5">
                  <div class="p-3 py-5">
                      <div class="d-flex justify-content-between align-items-center mb-3">
                          <h4 class="text-right">Peripherals</h4>
                      </div>
                      <div class="row mt-3">
                          <div class="col-md-12"><label class="labels">Mouse</label><input type="text" class="form-control" placeholder="" value={csgodata.mouse}></input></div>
                          <div class="col-md-12"><label class="labels">MousePad</label><input type="text" class="form-control" placeholder="" value={csgodata.mousePad}></input></div>
                          <div class="col-md-12"><label class="labels">KeyBoard</label><input type="text" class="form-control" placeholder="" value={csgodata.keyBoard}></input></div>
                      </div>
                  </div>
              </div>
              <div class="col-md-5">
                  <div class="p-3 py-5">
                      <div class="d-flex justify-content-between align-items-center mb-3">
                          <h4 class="text-right" style={{"color":"white"}}>Peripherals</h4>
                      </div>
                      <div class="row mt-3">
                          <div class="col-md-12"><label class="labels">HeadSet</label><input type="text" class="form-control" placeholder="" value={csgodata.headSet}></input></div>
                          <div class="col-md-12"><label class="labels">Monitor</label><input type="text" class="form-control" placeholder="" value={csgodata.monitor} ></input></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      </section>

      {/* crosshair settings */}
      <section>
          <div class="container rounded bg-white mt-5 mb-5">
          <div class="row">
              <div class="col-md-5">
                  <div class="p-3 py-5">
                      <div class="d-flex justify-content-between align-items-center mb-3">
                          <h4 class="text-right">Crosshair settings</h4>
                      </div>
                      <div class="row mt-3">
                          <div class="col-md-12"><label class="labels">Mouse</label><input type="text" class="form-control" placeholder="" value={csgodata.mouse}></input></div>
                          <div class="col-md-12"><label class="labels">MousePad</label><input type="text" class="form-control" placeholder="" value={csgodata.mousePad}></input></div>
                          <div class="col-md-12"><label class="labels">KeyBoard</label><input type="text" class="form-control" placeholder="" value={csgodata.keyBoard}></input></div>
                      </div>
                  </div>
              </div>
              <div class="col-md-5">
                  <div class="p-3 py-5">
                      <div class="d-flex justify-content-between align-items-center mb-3">
                          <h4 class="text-right" style={{"color":"white"}}>Peripherals</h4>
                      </div>
                      <div class="row mt-3">
                          <div class="col-md-12"><label class="labels">HeadSet</label><input type="text" class="form-control" placeholder="" value={csgodata.headSet}></input></div>
                          <div class="col-md-12"><label class="labels">Monitor</label><input type="text" class="form-control" placeholder="" value={csgodata.monitor} ></input></div>
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