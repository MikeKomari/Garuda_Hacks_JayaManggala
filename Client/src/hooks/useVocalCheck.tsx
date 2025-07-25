import { API } from "@/services/API";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const useVocalCheck = () => {
  const vocalMutation = useMutation({
    mutationFn: async (data: { audio: File; originalText: string }) => {
      const formData = new FormData();
      formData.append("audio", data.audio);
      formData.append("originalText", data.originalText);

      const response = await API.post("/vocal/checkVocal", formData);

      // Axios throws on non-2xx, but you can check status if needed
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    },

    onError: (e) => {
      if (axios.isAxiosError(e) && e.response) {
        const errorMessage = e.response.data.message || "Login Failed!";
        // setError(errorMessage);
        toast.error(errorMessage);
      } else {
        // setError("Something went wrong!");
        toast.error("Something went wrong!");
      }
    },
  });

  return {
    vocalCheck: vocalMutation.mutateAsync,
    isLoading: vocalMutation.isPending,
  };
};

export default useVocalCheck;
