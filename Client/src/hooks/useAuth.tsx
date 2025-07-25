import { API } from "@/services/API";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { userStore } from "@/store/userStore";
import { decodeToken } from "@/utils/utils";
import type { LoggedInUserPayload } from "@/types/types";

const useAuth = () => {
  // const [userRole, setRole] = useState<string>();
  const location = useLocation();
  const { setUser } = userStore();
  const [userNow, setUserNow] = useState<LoggedInUserPayload | null>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  //Login Mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoggedInUserPayload) => {
      const response = await API.post("/auth/login/", credentials);
      return { data: response.data };
    },
    onSuccess: ({ data }) => {
      const tokenStorage = localStorage;
      tokenStorage.setItem("token", data.token);
      tokenStorage.setItem("loginTime", Date.now().toString());

      const decoded = decodeToken(data.token);
      if (decoded) {
        setUser(decoded.role, decoded.id, true);
        setUserNow(decoded);
        setIsAuthenticated(true);
        toast.success("Login Successful!");

        // if (decoded.role === "Admin") {
        //   setTimeout(() => {
        //     navigate("/admin/dasbor");
        //   }, 1000);
        //   return;
        // }

        setTimeout(() => {
          navigate("/app");
        }, 1000);
      }
    },

    onError: (e) => {
      if (axios.isAxiosError(e) && e.response) {
        const errorMessage = e.response.data.message || "Login Failed!";
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        setError("Something went wrong!");
        toast.error("Something went wrong!");
      }
    },
  });
  const googleLoginMutation = useMutation({
    mutationFn: async (token: string) => {
      const response = await API.post("/auth/login-google/", { token });
      return { data: response.data };
    },
    onSuccess: ({ data }) => {
      const tokenStorage = localStorage;
      tokenStorage.setItem("token", data.token);
      tokenStorage.setItem("loginTime", Date.now().toString());

      const decoded = decodeToken(data.token);
      if (decoded) {
        setUser(decoded.role, decoded.id, true);
        setUserNow(decoded);
        setIsAuthenticated(true);
        toast.success("Login Successful!");

        // if (decoded.role === "Admin") {
        //   setTimeout(() => {
        //     navigate("/admin/dasbor");
        //   }, 1000);
        //   return;
        // }

        setTimeout(() => {
          navigate("/app");
        }, 1000);
      }
    },

    onError: (e) => {
      if (axios.isAxiosError(e) && e.response) {
        const errorMessage = e.response.data.message || "Login Failed!";
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        setError("Something went wrong!");
        toast.error("Something went wrong!");
      }
    },
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("loginTime");
    sessionStorage.removeItem("subs");
    sessionStorage.removeItem("subs");
    setUserNow(null);
    setUser(null, null, false);
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
          setUser(decoded.subs, decoded.id, true);
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
    isAuthenticated,
    login: loginMutation.mutate,
    loginLoading: loginMutation.isPending,
    logout,
  };
};

export default useAuth;
