import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout } from "antd";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Routes";

function App() {
  const { Header, Sider } = Layout;
  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
