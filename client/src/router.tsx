import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([

  {
    path: '/',
    element: <Navigate to="/auth" />
  },
  {
    path: "/auth",
    element: <div>Auth</div>

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