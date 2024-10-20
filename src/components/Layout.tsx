import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, Stack, Box, Typography } from "@mui/material";

import logo from "../assets/logo.png";

import { useLogOut } from "../store/logout.ts";
import { getCurrentUser } from "../store/getData.ts";

import Button from "./shared/Button.tsx";
import { ROLES } from "../services/constants.ts";

interface Props {
  children: ReactNode;
  userPage?: boolean;
}

const Layout = ({ userPage, children }: Props) => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const role =
    user?.name === ROLES.SUPER_ADMIN || user?.name === ROLES.DEVELOPER
      ? "Super admin"
      : "Admin";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleLogOut = async () => {
    try {
      localStorage.removeItem("blog");
      localStorage.removeItem("doctor");
      localStorage.removeItem("location");
      localStorage.removeItem("user");

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

  const handleAddUser = () => {
    navigate("/user");
  };

  return (
    <>
      <Stack
        position="fixed"
        width="100%"
        zIndex={10}
        sx={{
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
            {role}
          </Typography>

          <Stack direction="row" alignItems="center" gap={3}>
            <Button value="Log Out" onClick={handleLogOut} />
          </Stack>
        </Stack>
      </Stack>

      <Stack width="100%" maxWidth="1440px" margin="0 auto" py={13}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" gap={3}>
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

          {((!userPage && user?.name === ROLES.SUPER_ADMIN) ||
            user?.name === ROLES.DEVELOPER) && (
            <Button
              value="Add new user"
              onClick={handleAddUser}
              sx={{
                width: 150,
              }}
            />
          )}
        </Stack>

        {children}
      </Stack>
    </>
  );
};

export default Layout;
