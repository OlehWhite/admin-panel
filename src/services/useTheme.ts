import { createTheme } from "@mui/material";

export const getTheme = () => {
  return createTheme({
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      body: {
        fontSize: "24px",
        lineHeight: "1.2",
        fontWeight: 400,
        color: "#fff",
      },
      smallBody: {
        fontSize: "20px",
        lineHeight: "1.2",
        fontWeight: 400,
        color: "#1e1e1e",
      },
      h1: {
        fontSize: "64px",
        lineHeight: "1.2",
        fontWeight: 600,
        color: "#1e1e1e",
      },
      h2: {
        fontSize: "48px",
        lineHeight: "1.2",
        fontWeight: 600,
        color: "#1e1e1e",
      },
      h3: {
        fontSize: "46px",
        lineHeight: "1.2",
        fontWeight: 600,
        color: "#1e1e1e",
      },
      summary: {
        fontSize: "40px",
        lineHeight: "1.2",
        fontWeight: 800,
        color: "#1e1e1e",
      },
    },
    palette: {
      primary: {
        main: "rgba(0,0,0,0.85)", // Change this to your desired color
      },
      text: {
        primary: "#000", // Text color for inputs and labels
      },
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            // Default input border and text color
            color: "#000", // Text color inside the input
            "& fieldset": {
              borderColor: "#000", // Default border color
            },
            "&:hover fieldset": {
              borderColor: "#000", // Border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#000", // Border color when focused
            },
          },
        },
      },
    },
  });
};
