import Navbar from "@/components/ui/Navbar";
import React, { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/app");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-mainBgColor flex flex-col items-center justify-center px-6">
      {/* App Icon */}
      <div className="relative mb-16 animate-fade-in-scale">
        <img
          src="/PWA/LogoPNG.png"
          alt="Katasaka App Logo"
          className="w-60 h-60 animate-float"
        />
      </div>

      {/* App Name */}
      <div className="text-center mb-4 animate-slide-up-delayed">
        <h1
          className="text-6xl font-bold text-white"
          style={{ fontFamily: "MuseoModerno" }}
        >
          Katasaka
        </h1>
      </div>

      <style>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in-scale {
          animation: fadeInScale 0.8s ease-out forwards;
        }

        .animate-slide-up-delayed {
          opacity: 0;
          animation: slideUp 0.6s ease-out 0.4s forwards;
        }

        .animate-fade-in-late {
          opacity: 0;
          animation: fadeIn 0.6s ease-out 0.8s forwards;
        }

        .animate-float {
          animation: float 1.5s ease-in-out infinite 1.2s;
        }
      `}</style>
    </div>
  );
};

export default Main;
