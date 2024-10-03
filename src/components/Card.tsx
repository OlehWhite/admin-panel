import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";

interface Props {
  website: any;
}

const Card = ({ website }: Props) => {
  const navigate = useNavigate();

  const handleOpenCard = () => {
    navigate(`/website/${website.id}`);
  };

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
        transition: ".3s",
        backgroundColor: "#fff",

        ":hover": {
          transition: ".5s",
          backgroundColor: "#a6eaf37a",
        },
      }}
      onClick={handleOpenCard}
    >
      <Typography fontSize={21} fontWeight={600} color="rgb(55 152 210 / 98%)">
        {website.title}
      </Typography>

      <Box borderBottom="1px solid #000" />

      <Typography>
        Address: <Box component="strong">{website.address}</Box>
      </Typography>

      <Typography>
        Telephone: <Box component="strong">{website.tel}</Box>
      </Typography>

      <Typography>
        Email: <Box component="strong">{website.email}</Box>
      </Typography>
    </Stack>
  );
};

export default Card;
