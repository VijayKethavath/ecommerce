import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Register.css"

function Login(){
  const[email,setemail] = useState("")
  const[password,setpassword] = useState("")
  const[error,seterror] = useState(false)
  const navigate = useNavigate()

 async function onlogin(event){
  event.preventDefault()
      try {
        let checkemail = await fetch(`https://ecommerce-1-xd2h.onrender.com/user?email=${email}`)
        let emaildata = await checkemail.json()
        console.log(emaildata);
        

        if(emaildata.length==0){
          seterror(true)
          return
        }

        seterror(false)

        if(emaildata[0].password == password){
          localStorage.setItem("userId",emaildata[0].id)
          navigate("/")
          alert("login successfull")
         
        }
        else{
          seterror(true)
        }
        
      } catch (error) {
        console.log(error);
        
      }
  }

      return(
        <div className="register-page">
        <div className="container">
          <h1>Ecommerce</h1>
          <form onSubmit={onlogin}>
            <h2>Login</h2>
            <label>Email</label>
            <input type = "email" placeholder="Enter email" required onChange={()=>setemail(event.target.value)}/><br/>

            <label>Password</label>
            <input type = "password" placeholder="Enter password" required onChange={()=>setpassword(event.target.value)}/><br />

            {error && <p style={{color:"red"}}> Invaild User</p>}

            <button type="submit">Login</button>
            <p>Don't have an account <Link to="/Register" >Create Account </Link></p>
          </form>
        </div>
        </div>
      )
}
export default Login;