import { createTheme } from "@mui/material";

export const getTheme = () => {
  return createTheme({
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      // @ts-ignore
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
        main: "rgba(0,0,0,0.85)",
      },
      text: {
        primary: "#000",
      },
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: "#000",
            "& fieldset": {
              borderColor: "#000",
            },
            "&:hover fieldset": {
              borderColor: "#000",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#000",
            },
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            color: "#f50057",
            "&.Mui-checked": {
              color: "#4ca8c4",
            },
            "&.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#4ca8c4",
            },
          },
          track: {
            backgroundColor: "#f50057",
          },
        },
      },
    },
  });
};
