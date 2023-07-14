import React from "react";
import "./navbar.css";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import useRazorpay from "react-razorpay";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.user.name);
  const premium = useSelector((state) => state.user.premium);
  const Razorpay = useRazorpay();
  //premium button handler
  const premiumHandler = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get("http://localhost:3000/order/buy-premium", {
      headers: { Authorization: token },
    });
    // const razorpay = new Razorpay({ key: res.keyId });
    const options = {
      key: res.data.keyId,
      order_id: res.data.orderId,
      handler: async (response) => {
        axios.post("http://localhost:3000/order/success-premium", response, {
          headers: { Authorization: token },
        });
        alert("You are now a premium user!!");
        window.location.reload();
      },
    };
    const rzp = new Razorpay(options);
    rzp.on("payment.failed", function (response) {
      console.log(response);
      axios.post("http://localhost:3000/order/failed-premium", response, {
        headers: { Authorization: token },
      });
      alert("Failed transaction");
    });
    rzp.open();
  };
  //logout button handler
  const logoutHandler = () => {
    localStorage.clear();
  };
  return (
    <>
      <div className="navbar">
        <div className="logos">
          <a className="brand" href="/transactions">
            Mando
          </a>
          {isLoggedIn && !premium ? (
            <button className="premium" onClick={premiumHandler}>
              Buy Premium
            </button>
          ) : null}
          {isLoggedIn && premium ? (
            <button className="premium">Premium</button>
          ) : null}
        </div>
        <div className="navs">
          {isLoggedIn && <Link to="/transactions">Transactions</Link>}
          {premium && isLoggedIn ? (
            <>
              <Link to="/leaderboard">Leaderboard</Link>
              <Link to="/report">Report</Link>
            </>
          ) : isLoggedIn ? (
            <>
              <Link to="/transactions" className="disabled">
                Leaderboard <FontAwesomeIcon icon={faLock} />
              </Link>
              <Link to="/report" className="disabled">
                Report <FontAwesomeIcon icon={faLock} />
              </Link>
            </>
          ) : null}
          {isLoggedIn && (
            <a href="/" onClick={logoutHandler}>
              Logout
            </a>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default NavBar;
