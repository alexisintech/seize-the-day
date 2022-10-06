import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./style.css";
import Index from "./pages/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
