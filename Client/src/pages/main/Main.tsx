<<<<<<< HEAD
import Navbar from "@/components/ui/Navbar";
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
=======
import { GettingStarted } from "@/components/others/GettingStarted";
import { TechStack } from "@/components/others/TechStack";
import { Features } from "@/components/ui/Features";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/ui/Hero";
import React from "react";
>>>>>>> 27b1e3eaa18074b06b5e992c639f7826abffdf60

const Main = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 min-w-full">
<<<<<<< HEAD
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
=======
      <Hero />
      <Features />
      <TechStack />
      <GettingStarted />
      <Footer />
>>>>>>> 27b1e3eaa18074b06b5e992c639f7826abffdf60
    </div>
  );
};

export default Main;
