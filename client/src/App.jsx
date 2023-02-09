import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import All from "./scenes/All";
import Completed from "./scenes/Completed";
import InProgress from "./scenes/InProgress";
import Lists from "./scenes/Lists";
import Tags from "./scenes/Tags";

const router = createBrowserRouter([
  { path: "/", element: <Index /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/profile", element: <Profile /> },
  { path: "/all", element: <All /> },
  { path: "/inprogress", element: <InProgress /> },
  { path: "/completed", element: <Completed /> },
  { path: "/lists", element: <Lists /> },
  { path: "/tags", element: <Tags /> },
  { path: "/logout", element: <Index /> },
]);

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <RouterProvider router={router} />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
