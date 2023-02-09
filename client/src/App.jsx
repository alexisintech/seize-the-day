import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  { path: "/", element: <Index /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/profile", element: <Profile /> },
  // {path: "/Lists",element: <All />},
  // {path: "/Lists",element: <InProgress />},
  // {path: "/Lists",element: <Completed />},
  // {path: "/Lists",element: <Lists />},
  // {path: "/Tags",element: <Tags />},
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
