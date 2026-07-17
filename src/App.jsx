import Register from "./Components/Register/Register"
import Login from "./Components/Register/Login/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Single from "./Components/Singlepage/Single";
import Nopage from "./Components/Nopage/Nopage";
import Proceed from "./Components/Proceed/Proceed";

function App(){
  return(
    <>
     <BrowserRouter>
     <Routes>
      <Route path = "/Login" element={<Login/>}/>
      <Route path = "/Register" element = {<Register/>}/>
      <Route path = "/" element = {<Home/>}/>
      <Route path = "/Cart" element = {<Cart/>}/>
      <Route path = "/products/:id" element = {<Single/>}/>
      <Route path="*" element = {<Nopage/>}/>
      <Route path = "/Proceed" element = {<Proceed/>}/>
     </Routes>
     </BrowserRouter>
  </>
  )
}
export default App;