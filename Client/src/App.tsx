import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SkeletonTheme } from "react-loading-skeleton";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages/router";
import { GoogleOAuthProvider } from "@react-oauth/google";

const client = new QueryClient();

function App() {
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
  );
}

export default App;
