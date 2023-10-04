
function Register() {
    return (
      <>
          <section className="content">
              <form action=""> 
                    <div> 
                        <label htmlFor="FirstName">First Name</label>
                        <input type="text" name="email" id="email"/> 
                    </div> 
                    <div> 
                        <label htmlFor="LastName">Last Name</label>
                        <input type="text" name="passw" id="passw"/> 
                    </div> 
                    <div> 
                        <label htmlFor="UserName">Username</label>
                        <input type="text" name="email" id="email"/> 
                    </div> 
                    <div> 
                        <label htmlFor="Password">Password</label>
                        <input type="text" name="passw" id="passw"/> 
                    </div>
                    <div> 
                        <label htmlFor="Email">Email</label>
                        <input type="text" name="passw" id="passw"/> 
                    </div> 
                  <button type="submit">Register</button>
              </form>
        </section>
      </>
    );
  }
  
  export default Register;