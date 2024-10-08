import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, Stack, Box, Typography } from "@mui/material";

import logo from "../assets/logo.png";

import { useLogOut } from "../store/logout.ts";
import { getCurrentUser } from "../store/getData.ts";

import Button from "./shared/Button.tsx";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleLogOut = async () => {
    try {
      localStorage.clear();
      await useLogOut(navigate);
    } catch (error) {
      console.error("Failed  to Log out: ", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Stack width="100%" bgcolor="#f6ffff">
      <Stack
        sx={{
          backgroundColor: "#74EBD5",
          backgroundImage: "linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)",
          boxShadow: "0px 0px 13px 0px #000000a8",
        }}
      >
        <Stack
          component="header"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          py={2}
          width="100%"
          maxWidth="1440px"
          margin="0 auto"
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <Avatar
              variant="square"
              sx={{
                width: "auto",
              }}
              alt="Logo"
              title="Logo"
              src={logo as string}
            />

            <Typography
              color="rgb(55 152 210 / 98%)"
              fontSize={20}
              fontWeight={600}
            >
              Positive Reset Panel
            </Typography>
          </Stack>

          <Typography>
            <Box component="span" fontWeight={600}>
              Role:{" "}
            </Box>
            {user?.name}
          </Typography>

          <Stack direction="row" alignItems="center" gap={3}>
            <Button value="Log Out" onClick={handleLogOut} />
          </Stack>
        </Stack>
      </Stack>

      <Stack width="100%" maxWidth="1440px" margin="0 auto" py={3}>
        <Stack direction="row" gap={2}>
          <Button
            value="Back"
            onClick={handleBack}
            sx={{
              width: 80,
            }}
          />

          <Button
            value="Home"
            onClick={handleGoHome}
            sx={{
              width: 80,
            }}
          />
        </Stack>

        {children}
      </Stack>
    </Stack>
  );
};

export default Layout;
