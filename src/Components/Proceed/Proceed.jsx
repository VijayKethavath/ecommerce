import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Proceed.css";

function Proceed() {

  const total = localStorage.getItem("totalPrice");

  return (
    <div className="proceedContainer">

      <Navbar />

      <div className="proceedCard">

        <div className="successIcon">
          ✔
        </div>

        <h1>Order Placed Successfully!</h1>

        <p className="thanks">
          Thank you for shopping with us.
        </p>

        <div className="orderDetails">

          <h3>Total Amount</h3>

          <h2>${total ? total : "0.00"}</h2>

        </div>

        <p className="delivery">
          📦 Your order will be delivered within
          <strong> 3 - 5 business days.</strong>
        </p>

        <div className="btnBox">

          <Link to="/">
            <button className="homeBtn">
              Continue Shopping
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Proceed;