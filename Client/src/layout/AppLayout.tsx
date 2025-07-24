import Navbar from "@/components/ui/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <Outlet />
      <Navbar />
    </div>
  );
};

export default AppLayout;
