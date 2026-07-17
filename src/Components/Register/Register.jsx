import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css"

function Register(){
  const[user,setuser] = useState("");
  const[email,setemail] = useState("");
  const[password,setpassword] = useState("");
  const[error,seterror] = useState(false)

  const onsubmit = async(event)=>{
       event.preventDefault()
       try {
        const newuser = {user,email,password}
        console.log(newuser);
        

        let checkemail = await  fetch(`http://localhost:5000/user?email=${email}`)
        let emaildata = await checkemail.json();

        if(emaildata.length!=0){
          seterror(true)
          return
        }
        seterror(false)

        let res = await fetch("http://localhost:5000/user",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(newuser)
        })


        if(res.ok){
          alert("Registation successfully")
        }
        else{
          alert("Something went wrong")
        }
       } catch (error) {
         console.log(error);
         
       }
  }

  return (
    <div className="register-page">
        <div className="container">
            <h1>Ecommerce</h1>

            <form onSubmit={onsubmit}>
                <h2>Register</h2>

                <label>Username</label>
                <input
                    type="text"
                    placeholder="Enter Username"
                    required
                    onChange={(event) => setuser(event.target.value)}
                />

                <label>Email</label>
                <input
                    type="email"
                    placeholder="Enter Email"
                    required
                    onChange={(event) => setemail(event.target.value)}
                />

                <label>Password</label>
                <input
                    type="password"
                    placeholder="Enter Password"
                    required
                    onChange={(event) => setpassword(event.target.value)}
                />

                {error && <p className="error">User Already Exists</p>}

                <button type="submit">Register</button>

                <p>
                    Have an Account? <Link to="/Login">Login Here</Link>
                </p>
            </form>
        </div>
    </div>
);
}
export default Register;