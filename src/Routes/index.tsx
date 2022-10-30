import React from "react";
import { Route, Routes } from "react-router-dom";
import Application from "../Components/Application";
import Login from "../Components/Login";
import { PrivateRoute } from "../Routes/privateRoute";

const AppRouter = () => {
  const userData:string = sessionStorage.getItem('user') || '{}';
  const userObj:any = JSON.parse(userData);
  return (
    <Routes>
      <Route path="/" element={userObj.id ? <PrivateRoute>
            <Application />
          </PrivateRoute>: <Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Application />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
