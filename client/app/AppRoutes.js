import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/Home/Home";
import { me } from "./store";
import SingleAlbum from "../features/SingleAlbum/SingleAlbum";
import Cart from "../features/Cart/Cart.js";
import UserProfile from "../features/user/userProfile";

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/userProfile/:id" element={<UserProfile />} />
          <Route path="/albums/:id" element={<SingleAlbum />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/home" element={<Home />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path="/albums/:id" element={<SingleAlbum />} />
          <Route path="/login" element={<AuthForm name="login" displayName="Login" />} />
          <Route path="/signup" element={<AuthForm name="signup" displayName="Sign Up" />} />
          <Route path="/*" element={<AuthForm name="login" displayName="Login" />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
