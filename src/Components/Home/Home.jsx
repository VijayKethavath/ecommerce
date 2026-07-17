import { useEffect, useState } from "react"
import Navbar from "../Navbar/Navbar"
import { Link, Navigate } from "react-router-dom"
import "./Home.css";

function Home(){
  if(localStorage.getItem("userId")==null){
    return <Navigate to = "/Login/"/>
  }
  const[data,setData] = useState([])
  const[value,setValue] = useState("")
  const[load,setLoad] = useState(false)

  useEffect(()=>{

    async function Fetchdata(){
    try{
      setLoad(true)
      let res = await fetch("https://fakestoreapi.com/products")
      let jsonData = await res.json();
      setData(jsonData)
      setLoad(false)
      console.log(jsonData)

    }catch(error){
       console.log(error);
    }
  }
  Fetchdata()
  },[])

  async function onBtn(event){
    try {
       
      if(event.target.textContent == "All"){
      let res = await fetch("https://fakestoreapi.com/products")
      let jsonData = await res.json();
      setData(jsonData)

      }
      else{
        setLoad(true)
        let res = await fetch(`https://fakestoreapi.com/products/category/${event.target.textContent}`)
        let jsonData = await res.json();
        setData(jsonData)
        setLoad(false)
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  function onsrc(event){
       setValue(event.target.value)
  }

  let filtarData = data.filter(item =>item.title.toLowerCase().includes(value.toLowerCase()))
  
  

  return(
   <div className="HomeContainer">
      <Navbar/>
      <div className="HomeSub">

    <div className="CategoryBar">

        <div className="CategoryBtns">
            <button onClick={onBtn}>All</button>
            <button onClick={onBtn}>men's clothing</button>
            <button onClick={onBtn}>jewelery</button>
            <button onClick={onBtn}>electronics</button>
            <button onClick={onBtn}>women's clothing</button>
        </div>

        <input className="homesrc" type="search" placeholder="Search Product..." onChange={onsrc}/>

    </div>

    <div className="HomeCard">

        {
            load ?(<h1 className="load">Loading...</h1>)
            :(
            filtarData.length===0 ?(<h1 className="nodata">No Data Found</h1>)
            :(
            filtarData.map(item=>(
                <Link to={"/products/"+item.id} key={item.id} className="card">

                    <img src={item.image} alt={item.title}/>

                    <h4>{item.title}</h4>
                    <p className="itemprice">
                       <span>Price</span> ${item.price}
                     </p>

                    <button className="itembtn"> Details </button>

                </Link>
            ))))
        }

    </div>

</div>
   </div>
  )
}
export default  Home