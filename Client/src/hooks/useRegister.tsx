import { API } from "@/services/API";
import type { RegisterUserPayload } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import useAuth from "./useAuth";

const useRegister = () => {
  const { login } = useAuth();
  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterUserPayload) => {
      const response = await API.post("/auth/register", userData);
      return { data: response.data.data, token: response.data.token };
    },
    onSuccess: ({ data, token }) => {
      login({ username: data.username, password: data.password });
      // You can handle success actions here, like redirecting or showing a success message
    },

    onError: (e) => {
      if (axios.isAxiosError(e) && e.response) {
        const errorMessage = e.response.data?.message || "Login Gagal";
        toast.error(errorMessage);
      } else {
        toast.error("Terdapat kesalahan! Mohon coba lagi");
      }
    },
  });
  return {
    loginLoading: registerMutation.isPending,
    registerUser: registerMutation.mutate,
  };
};

export default useRegister;
