import React from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: any) {
  const isLogin = sessionStorage.getItem("user") ? true : false;
  return isLogin ? children : <Navigate to="/" />;
}
