// routes.tsx or router.tsx
import { createBrowserRouter } from "react-router-dom";

import roleRoutes from "./role/roleRouter"; // <== Modularized
import Main from "./main/Main";
import ErrorPage from "./ErrorPage";
import Login from "./main/Login";
import Landing from "./main/Landing";
import AppLayout from "@/layout/AppLayout";
import RoleLayout from "@/layout/RoleLayout";
import Journey from "./features/Journey";
import Learning from "./features/Learning";
import Register from "./main/Register";
import PreApp from "./main/PreApp";
import Profile from "./features/Profile";
import Story from "./features/Story";
import Question from "./features/Question";
import Listening from "./features/Listening";
import ListenRepeat from "./features/ListenRepeat";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "preapp",
    element: <PreApp />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "/app",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "journey",
        element: <Journey />,
      },
      {
        path: "learning",
        element: <Learning />,
      },
      {
        path: "story",
        element: <Story />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "question",
        element: <Question />,
      },
      {
        path: "listening",
        element: <Listening />,
      },
      {
        path: "listen-repeat",
        element: <ListenRepeat />,
      },

      // Other public routes that are based on role can be added here
      // For example: /admin/dasboard, /user/profile, etc.
      {
        path: "role",
        element: <RoleLayout />,
        children: roleRoutes, // <== Nest admin routes
      },
    ],
  },

  // {
  //   path: "learn",
  //   element
  // }
]);
