import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import DashboardLayout from "./layouts/DashboardLayout";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import ArtistPage from "./pages/ArtistPage";

const router = createBrowserRouter([

  {
    path: '/',
    element: <Navigate to="/auth/login" />
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />

      },
      {
        path: "register",
        element: <RegisterPage />

      }
    ]
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "home",
        element: <HomePage />

      },
      {
        path: "users",
        element: <UserPage />

      },
      {
        path: "artists",
        element: <ArtistPage />

      }
    ]

  }
]);


export default function App() {
  return (
    <RouterProvider router={router} />
  );
}