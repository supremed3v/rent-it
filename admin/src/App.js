import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Home from "./pages/Home";
import { ThemeContextProvider, useThemeContext } from "./context/ThemeContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Categories from "./pages/Categories";
import Sellers from "./pages/Sellers";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "sellers",
          element: <Sellers />,
        },
      ],
    },
  ]);
  const { themeColor, toggleTheme } = useThemeContext();
  const theme = createTheme({
    palette: {
      mode: themeColor,
      primary: {
        main: "#fff",
      },
      secondary: {
        main: "#e7e7e7e7",
      },
    },
    typography: {
      fontFamily: "Roboto",
      h1: {
        fontSize: "3rem",
        fontWeight: 500,
        lineHeight: 1.167,
        letterSpacing: "0em",
      },
      h2: {
        fontSize: "2.125rem",
        fontWeight: 500,
        lineHeight: 1.2,
        letterSpacing: "0em",
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 500,
        lineHeight: 1.167,
        letterSpacing: "0em",
      },
      h4: {
        fontSize: "1.25rem",
        fontWeight: 500,
        lineHeight: 1.235,
        letterSpacing: "0.00735em",
      },
      h5: {
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: 1.334,
        letterSpacing: "0em",
      },
      subtitle1: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.75,
        letterSpacing: "0.00938em",
      },
      subtitle2: {
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: 1.57,
        letterSpacing: "0.00714em",
      },
      body1: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.46429,
        letterSpacing: "0.01071em",
      },
      body2: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: "0.01071em",
      },
      button: {
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: 1.75,
        letterSpacing: "0.02857em",
        textTransform: "uppercase",
      },
    },
  });

  return (
    <ThemeContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ThemeContextProvider>
  );
}

export default App;
