import { Routes, Route } from "react-router-dom";

import { getTheme } from "./services/useTheme.ts";
import { ThemeProvider } from "@mui/material";

import UserLoader from "./components/UserLoader.tsx";

import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import WebSite from "./pages/WebSite.tsx";
import Blog from "./pages/Blog.tsx";

function App() {
  const theme = getTheme();

  return (
    <ThemeProvider theme={theme}>
      <UserLoader />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/website/:id" element={<WebSite />} />
        <Route path="/website/:id/blogs" element={<Blog />} />
        <Route path="/website/:id/blogs/:idBlog" element={<Blog />} />
        <Route path="/website/" element={<WebSite />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
