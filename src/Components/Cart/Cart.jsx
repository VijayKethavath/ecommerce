import { useEffect, useState} from "react"
import Navbar from "../Navbar/Navbar"
import "./Cart.css"
import { useNavigate, Navigate } from "react-router-dom";


function Cart(){
   if(localStorage.getItem("userId")==null){
    return <Navigate to = "/Login/"/>
  }
  const[cart,setcart] = useState([])
  const[load,setLoad] = useState(false)
  const navigate = useNavigate();

  
    async function fetchCart(){
       try {
        setLoad(true)
        let userId = localStorage.getItem("userId")
        console.log(userId);
        
        let res = await fetch(`http://localhost:5000/cart?user_Id=${userId}`)
        let jsonData = await res.json();
        console.log(jsonData);
        
        setcart(jsonData)
        setLoad(false)
        
       } catch (error) {
         console.log(error);
         setLoad(false)
         
       }
    }
  useEffect(()=>{
    fetchCart()
  },[])

  async function deleteCart(id){
    try {
      let res = await fetch(`http://localhost:5000/cart/${id}`,{
      method:"DELETE"
      
    })
    fetchCart()
    } catch (error) {
      console.log(error)
    }
  }

  async function emptyCart(){
    try {

      for(let item of cart){
        await fetch(`http://localhost:5000/cart/${item.id}`,{
          method:"DELETE"
        })
      }
      fetchCart()
      
    } catch (error) {
      console.log(error)
    }
  }

  const Totalprice = cart.reduce((sum,item)=> {
    return sum+item.price
  },0)

  function proceedBuy(){

    localStorage.setItem("totalPrice", Totalprice.toFixed(2));

    navigate("/Proceed");

}

  return(
     <div className="cartcon">  
      <Navbar/>
      <div className="cartsub">
        {
          load?(<h1 className="load">Loading..</h1>):
          (
            cart.length === 0?(<h1>Your cart is Empty</h1>):
            (
              <div className="cartcard">
                {
                  cart.map(item =>(
                    <div className="cartitem" key={item.id}>
                      <img className="cartimg" src={item.image}/>
                      <h3 className="carttitle">{item.title}</h3>
                      <p className="cartprice">${item.price.toFixed(2)}</p>
                      <button className="cartremove" onClick={()=>deleteCart(item.id)}>Remove</button>
                    </div>
                  ))
                }
              <div className="cartsummary">

                <h2 className="carttotal"> Total : <span>${Totalprice.toFixed(2)}</span></h2>

                 <div className="buttonGroup">
                  <button className="carproceed" onClick={proceedBuy} >🛒 Proceed to Buy </button>

                 <button className="cartempty" onClick={emptyCart}>Empty Cart</button>
                 </div>

               </div>
              </div>
            )
          )
        }

      </div>
      
     </div>
  )
}
export default Cart