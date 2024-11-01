import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, TextField, Typography } from "@mui/material";

import { login } from "../store/login.ts";

import { IAuthorization } from "../types/login.types.ts";
import { DEFAULT_AUTHORIZATION } from "../services/constants.ts";

import Button from "../components/shared/Button.tsx";

const Login = () => {
  const navigate = useNavigate();

  const [authorization, setAuthorization] = useState<IAuthorization>(
    DEFAULT_AUTHORIZATION,
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const user = await login(authorization.login, authorization.password);

    if (user) {
      navigate("/");
    } else {
      setAuthorization((prevState) => ({
        ...prevState,
        failed: "Login or password is incorrect!",
      }));
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <Stack
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      gap={3}
      sx={{
        backgroundColor: "#74EBD5",
        backgroundImage: "linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)",
      }}
    >
      <Typography variant="h2" color="#fff">
        Welcome!
      </Typography>

      <Stack
        component="form"
        width="100%"
        maxWidth={300}
        gap={3}
        border="1px solid #000"
        borderRadius={3}
        p={6}
        sx={{
          background: "rgba(255,255,255,0.31)",
          backdropFilter: "blur(100px)",
        }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <TextField
          label="Login"
          type="email"
          multiline
          onKeyPress={handleKeyDown}
          value={authorization.login}
          onChange={(e) => {
            setAuthorization((prevState) => ({
              ...prevState,
              login: e.target.value,
            }));
          }}
        />

        <TextField
          label="Password"
          type="password"
          multiline
          onKeyPress={handleKeyDown}
          value={authorization.password}
          onChange={(e) => {
            setAuthorization((prevState) => ({
              ...prevState,
              password: e.target.value,
            }));
          }}
        />

        {authorization.failed && (
          <Typography color="red">{authorization.failed}</Typography>
        )}

        <Button
          value="Login"
          sx={{ height: 56 }}
          onClick={(e) => handleSubmit(e)}
        />
      </Stack>
    </Stack>
  );
};

export default Login;
