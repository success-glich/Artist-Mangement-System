import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/LoginPage";

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

      }
    ]
  },
  {
    path: "/dashboard",
    element: <div>Dashboard</div>

  }
]);


export default function App() {
  return (
    <RouterProvider router={router} />
  );
}