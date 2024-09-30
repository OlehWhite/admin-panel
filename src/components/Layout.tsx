import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Stack,
  Box,
  Typography,
  Breadcrumbs,
  Link,
} from "@mui/material";

import logo from "../assets/logo.png";
import { IBreadcrumbs } from "../types/role.types.ts";

import { useLogOut } from "../store/logout.ts";
import { getCurrentUser } from "../store/getData.ts";

import Button from "./shared/Button.tsx";

interface Props {
  children: ReactNode;
  breadcrumbs?: IBreadcrumbs[];
}

const Layout = ({ children, breadcrumbs }: Props) => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleOpenProfile = () => {
    navigate("/profile");
  };

  const handleLogOut = async () => {
    await useLogOut(navigate);
  };

  return (
    <Stack width="100%" height="100vh" bgcolor="#f6ffff">
      <Stack
        sx={{
          backgroundColor: "#74EBD5",
          backgroundImage: "linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)",
          boxShadow: "1px -1px 10px",
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
            {user.name}
          </Typography>

          <Stack direction="row" alignItems="center" gap={3}>
            <Button value="Profile" onClick={handleOpenProfile} />

            <Button value="Log Out" onClick={handleLogOut} />
          </Stack>
        </Stack>
      </Stack>

      <Stack width="100%" maxWidth="1440px" margin="0 auto" py={3}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ pb: 2 }}>
          {breadcrumbs?.map(({ title, link }, index) => (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              href={link}
              sx={{ fontSize: 22 }}
            >
              {title}
            </Link>
          ))}
        </Breadcrumbs>

        {children}
      </Stack>
    </Stack>
  );
};

export default Layout;
