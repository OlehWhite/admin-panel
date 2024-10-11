import { Routes, Route } from "react-router-dom";

import { getTheme } from "./services/useTheme.ts";
import { ThemeProvider } from "@mui/material";

import UserLoader from "./components/UserLoader.tsx";

import Home from "./pages/Home.tsx";
import Blog from "./pages/Blog.tsx";
import Login from "./pages/Login.tsx";
import Profile from "./pages/Profile.tsx";
import WebSite from "./pages/WebSite.tsx";
import Location from "./pages/Location.tsx";
import Provider from "./pages/Provider.tsx";

function App() {
  const theme = getTheme();

  return (
    <ThemeProvider theme={theme}>
      <UserLoader />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/website/:id" element={<WebSite />} />
        <Route path="/website/:id/blogs" element={<Blog />} />
        <Route path="/website/:id/blogs/:idBlog" element={<Blog />} />
        <Route path="/website/:id/locations" element={<Location />} />
        <Route
          path="/website/:id/locations/:idLocation"
          element={<Location />}
        />
        <Route path="/website/:id/providers" element={<Provider />} />
        <Route
          path="/website/:id/providers/:idProvider"
          element={<Provider />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
