import { LoggedInUserPayload, LoginUserCredentials } from "@/types/types";
import { API } from "@/utils/API";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { decodeToken } from "../utils/utils";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { userStore } from "@/store/userStore";

const useAuth = () => {
  // const [userRole, setRole] = useState<string>();
  const location = useLocation();
  const { setUser } = userStore();
  const [user, setUserNow] = useState<LoggedInUserPayload | null>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isRemember, setIsRemember] = useState<boolean>(false);
  const navigate = useNavigate();
  //Login Mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginUserCredentials) => {
      const response = await API.post("/auths/login-user", credentials);
      return { data: response.data, rememberMe: credentials.rememberMe };
    },
    onSuccess: ({ data, rememberMe }) => {
      const tokenStorage = rememberMe ? localStorage : sessionStorage;
      setIsRemember(rememberMe);
      tokenStorage.setItem("token", data.token);
      tokenStorage.setItem("loginTime", Date.now().toString());

      const decoded = decodeToken(data.token);
      if (decoded) {
        setRole(decoded.role, decoded.id, rememberMe);
        setUser(decoded);
        setIsAuthenticated(true);
        setItemCount(0);
        sessionStorage.removeItem("cart");
        toast.success("Login Berhasil!");

        if (decoded.role === "Admin") {
          setTimeout(() => {
            navigate("/admin/dasbor");
          }, 1000);
          return;
        }

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    },

    onError: (e) => {
      if (axios.isAxiosError(e) && e.response) {
        const errorMessage = e.response.data.message || "Login Gagal";
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        setError("Terdapat kesalahan! Mohon coba lagi");
        toast.error("Terdapat kesalahan! Mohon coba lagi");
      }
    },
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("loginTime");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("cart");
    setUser(null);
    setRole(null, null, isRemember);
    setIsAuthenticated(false);

    navigate("/login");
  };

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const loginTime =
      localStorage.getItem("loginTime") || sessionStorage.getItem("loginTime");

    if (token && loginTime) {
      const elapsedTime = Date.now() - parseInt(loginTime, 10);
      const oneDay = 24 * 60 * 60 * 1000;

      if (elapsedTime > oneDay) {
        logout();
      } else {
        const decoded = decodeToken(token);
        if (decoded) {
          setRole(decoded.role, decoded.id, isRemember);
          if (
            location.pathname.includes("/register") ||
            location.pathname.includes("/login")
          ) {
            toast.success("Login successful!");
            setTimeout(() => {
              navigate("/");
            }, 1000);
          }
        }
      }
    }
  }, []);

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    loginLoading: loginMutation.isPending,
    logout,
  };
};

export default useAuth;
