import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./style.css";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/logout",
    element: <Index />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
