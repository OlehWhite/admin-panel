import { Stack, Box } from "@mui/material";

const Login = () => {
  return (
    <Stack
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      sx={{
        background:
          "linear-gradient(90deg, rgba(70,189,255,1) 0%, rgba(68,50,134,1) 100%)",
      }}
    >
      <Box component="h1" color="#fff">
        Welcome!
      </Box>
    </Stack>
  );
};

export default Login;
