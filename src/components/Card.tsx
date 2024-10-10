import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { Website } from "../types/websites.types.ts";
import { getCurrentUser } from "../store/getData.ts";
import { ROLES } from "../services/constants.ts";

interface Props {
  website: Website;
}

const Card = ({ website }: Props) => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleOpenCard = () => {
    navigate(`/website/${website.id}`);
  };

  if (user.name === ROLES.DEVELOPER || user.name === ROLES.SUPER_ADMIN) {
    return (
      <Stack
        width="100%"
        maxWidth={403}
        gap={1}
        p={3}
        borderRadius={2}
        border="1px solid #000"
        sx={{
          cursor: "pointer",
          transition: ".5s",
          backgroundColor: "#fff",
          boxShadow: "0px 0px 7px 0px #000",

          ":hover": {
            transition: ".5s",
            backgroundColor: "#a6eaf37a",
          },
        }}
        onClick={handleOpenCard}
      >
        <Typography
          fontSize={21}
          fontWeight={600}
          color="rgb(55 152 210 / 98%)"
        >
          {website.title}
        </Typography>

        <Box borderBottom="1px solid #000" />

        <Typography>
          <Box component="strong"> Address:</Box> {website.address || "-"}
        </Typography>

        <Typography>
          <Box component="strong"> Telephone:</Box> {website.tel || "-"}
        </Typography>

        <Typography>
          <Box component="strong"> Email: </Box>
          {website.email || "-"}
        </Typography>
      </Stack>
    );
  } else if (website.keyName === user.name) {
    return (
      <Stack
        width="100%"
        maxWidth={403}
        gap={1}
        p={3}
        borderRadius={2}
        border="1px solid #000"
        sx={{
          cursor: "pointer",
          transition: ".5s",
          backgroundColor: "#fff",
          boxShadow: "0px 0px 7px 0px #000",

          ":hover": {
            transition: ".5s",
            backgroundColor: "#a6eaf37a",
          },
        }}
        onClick={handleOpenCard}
      >
        <Typography
          fontSize={21}
          fontWeight={600}
          color="rgb(55 152 210 / 98%)"
        >
          {website.title}
        </Typography>

        <Box borderBottom="1px solid #000" />

        <Typography>
          <Box component="strong"> Address:</Box> {website.address || "-"}
        </Typography>

        <Typography>
          <Box component="strong"> Telephone:</Box> {website.tel || "-"}
        </Typography>

        <Typography>
          <Box component="strong"> Email: </Box>
          {website.email || "-"}
        </Typography>
      </Stack>
    );
  }
};

export default Card;
