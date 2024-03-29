import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "gray",
        }}
      >
        <img
          style={{ width: 300, height: 150, marginRight: "50px" }}
          src={
            "https://images.squarespace-cdn.com/content/v1/57f00064d2b8571a3cd0b561/1563233403985-Q7XS92I9XRVYB1QMC6QN/spinning-record.gif"
          }
        />
        <h1
          style={{
            fontFamily: "fantasy",
            textAlign: "center",
            width: "100vw",
            fontSize: 100,
          }}
        >
          Cash Money Records
        </h1>
      </div>
      <nav>
        {isLoggedIn ? (
          <div>
            <Link to="/home">Home</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
            <Link to="/cart">Cart</Link>
          </div>
        ) : (
          <div>
            <Link to="/home">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">Cart</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
