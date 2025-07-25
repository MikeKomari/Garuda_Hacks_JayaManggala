import Navbar from "@/components/ui/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div
      style={{
        backgroundImage: "url(/assets/bgApp.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        opacity: 1,
      }}
    >
      <Outlet />
      <Navbar />
    </div>
  );
};

export default AppLayout;
