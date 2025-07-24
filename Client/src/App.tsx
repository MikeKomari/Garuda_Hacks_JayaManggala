import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SkeletonTheme } from "react-loading-skeleton";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages/router";
<<<<<<< HEAD
import { GoogleOAuthProvider } from "@react-oauth/google";
=======
>>>>>>> 27b1e3eaa18074b06b5e992c639f7826abffdf60

const client = new QueryClient();

function App() {
<<<<<<< HEAD
  console.log(import.meta.env.VITE_GOOGLE_CLIENT_KEY);
  return (
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_KEY ?? ""}
    >
      <QueryClientProvider client={client}>
        <SkeletonTheme baseColor="#202024" highlightColor="#2a2c36">
          <RouterProvider router={router} />
        </SkeletonTheme>
      </QueryClientProvider>
    </GoogleOAuthProvider>
=======
  return (
    <QueryClientProvider client={client}>
      <SkeletonTheme baseColor="#202024" highlightColor="#2a2c36">
        <RouterProvider router={router} />
      </SkeletonTheme>
    </QueryClientProvider>
>>>>>>> 27b1e3eaa18074b06b5e992c639f7826abffdf60
  );
}

export default App;
