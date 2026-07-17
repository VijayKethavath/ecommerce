import { NavLink, useNavigate } from "react-router-dom"
import "./Navbar.css"
import { useState } from "react";
import { useEffect } from "react";

function Navbar(){
  const navigate = useNavigate()
  const[count,setCount] = useState(0)

  useEffect(()=>{

    async function getCount(){
    try {

      const userId = localStorage.getItem("userId")
      let res = await fetch(`http://localhost:5000/cart?user_Id=${userId}`)
      let jsonData = await res.json()
      setCount(jsonData.length)
      console.log(jsonData);
      
    } catch (error) {
      console.log(error);
      
    }
  }
  getCount()

  
  })

  const style = ({ isActive }) => {
  return {
    color: isActive ? "#000" : "#666",
    fontWeight: isActive ? "700" : "500",
    borderBottom: isActive ? "2px solid #000" : "none",
    paddingBottom: "4px"
  };
};

    function logout(){
      localStorage.removeItem("userId")
      navigate("/Login")

    }

  return(
    <div className=" navcontainer">
      <h3 className="webname">Ecommerce</h3>
      <div className="subcontainer">
        <NavLink to="/" style={style}>Home</NavLink>
        {/* <NavLink to="/Cart" style = {style}>Cart</NavLink> */}
        <NavLink  to="/Cart" style = {style} className="cartlink">Cart
         <span className="cartcount">({count})</span>
        </NavLink>
        <button onClick={logout}>Logout</button>
      </div>
      

    </div>
  )
}
export default Navbar;