import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = ({ setIsAuthenticated }) => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundImage: 'url("/path-to-your-background-image.jpg")',
        backgroundSize: "cover",
      }}
    >
      {/* Sidebar */}
      <Sidebar style={{ width: "250px", height: "100vh", position: "fixed" }} />

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          height: "100%",
        }}
      >
        <Header setIsAuthenticated={setIsAuthenticated} />

        {/* Content area for the Outlet */}
        <div
          style={{ flex: 1, paddingBottom: "60px", boxSizing: "border-box" }}
        >
          <Outlet />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
