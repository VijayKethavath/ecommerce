import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../Navbar/Navbar";
import "./Single.css"

function Single(){
   if(localStorage.getItem("userId")==null){
    return <Navigate to = "/Login/"/>
  }
const{id} = useParams();
const[data,setData] = useState({})
const[load,setLoad] = useState(false)
const navigate = useNavigate()

useEffect(()=>{
  async function fetchData(){
    try {
      setLoad(true)
      let res = await fetch(`https://fakestoreapi.com/products/${id}`)
      let jsonData = await res.json()
      setData(jsonData)
      console.log(jsonData);
      setLoad(false)

    } catch (error) {
       console.log(error)
    }
  }
  fetchData()
},[])

async function onCart(data){
  try {
    let cart = {
       productId: data.id,
       image: data.image,
       title: data.title,
       price: data.price,
       user_Id: localStorage.getItem("userId")
    }

    let res = await fetch("http://localhost:5000/cart",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(cart)
    })

    if(res.ok){
      alert("Cart Added")
      
    }
    else{
      alert("Fail to add")
    }
  } catch (error) {
    console.log(error);
    
  }

}

  return(
    <div className="singlecontainer">
        < Navbar/>
        <div className="singlesub">
         { load?(<h1 className="load">Load Product...</h1>):
          (
            <div className="singlecart">

            <img className="singleimg" src={data.image} alt={data.title} />

              <div className="singleDetails">

                <h2 className="singletitle">{data.title}</h2>

                 <p className="singleDes">{data.description}</p>

                 <p className="singlerate">⭐ {data.rating?.rate} / 5 </p>

                 <p className="singlecount">{data.rating?.count} Reviews </p>

                 <h1 className="singleprice"> ${data.price}</h1>

                  <div className="btnGroup">
                  <button className="cartbtn" onClick={()=>onCart(data)}> Add To Cart </button>

                   <button  className="goback"  onClick={() => navigate(-1)} > ← Go Back</button>
                  </div>

              </div>

           </div>
          )
        }
      </div>
      
      
    </div>
  )
}
export default Single