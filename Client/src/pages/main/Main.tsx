import Navbar from "@/components/ui/Navbar";
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Main = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 min-w-full">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const token = credentialResponse.credential;
          console.log("ID Token:", token);

          // Optional: decode JWT
          const userInfo = jwtDecode(token!);
          console.log("User Info:", userInfo);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      <Navbar />
    </div>
  );
};

export default Main;
