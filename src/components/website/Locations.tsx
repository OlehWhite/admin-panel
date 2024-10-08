import { useNavigate, useParams } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IWebsiteState } from "../../types/websites.types.ts";

import Button from "../shared/Button.tsx";
import openImage from "../../assets/location-open.png";
import openingSoonImage from "../../assets/location-opening-soon.png";

const Locations = ({ stateWebsite }: IWebsiteState) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleAddNewLocation = () => {
    try {
      navigate(`/website/${id}/locations`);
    } catch (error) {
      console.error("Can`t to create a new location:", error);
    }
  };

  const handleOpenLocation = (location: any, idLocation: string) => {
    try {
      if (location) {
        localStorage.setItem("location", JSON.stringify(location));
      }
      navigate(`/website/${id}/locations/${idLocation}`);
    } catch (error) {
      console.error("Can`t to open the location:", error);
    }
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="locations"
        id="locations"
      >
        <Typography fontSize={20}>
          Locations{" "}
          <Box component="span" fontSize={16} fontWeight={200}>
            {" "}
            ( Image, Title, Telephone, Email, Link, Address, Google map, Open /
            Opening soon )
          </Box>
        </Typography>
      </AccordionSummary>

      <Box borderBottom="1px solid #BEBEBE" mb={2} />

      <AccordionDetails>
        <Stack direction="row" justifyContent="center">
          <Button
            value="Add new block"
            onClick={handleAddNewLocation}
            sx={{
              width: "100%",
              maxWidth: 300,
              height: 56,
              mb: 3,
            }}
          />
        </Stack>

        <Stack flexWrap="wrap" width="100%" gap={3.6}>
          {stateWebsite?.locations.reverse().map((location) => (
            <Stack
              key={location.id}
              sx={{
                cursor: "pointer",
                transition: ".5s",

                ":hover": {
                  transition: ".5s",
                  backgroundColor: "#a6eaf37a",
                },
              }}
              direction="row"
              flexWrap="wrap"
              gap={3}
              boxShadow="0px 0px 13px 0px #000000a8;"
              borderRadius={2}
              overflow="hidden"
              height={150}
              onClick={() => handleOpenLocation(location, location.id)}
            >
              <Stack
                component="img"
                src={location.open ? openImage : openingSoonImage}
                sx={{
                  width: 250,
                }}
              />
              <Stack gap={1} justifyContent="center">
                <Typography color="#3498db" fontSize={20}>
                  {location.title}
                </Typography>

                <Typography fontWeight={300} fontStyle="italic">
                  {location.address}
                </Typography>

                <Typography color="#959595">{location.email}</Typography>

                <Typography color="#959595">{location.tel}</Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default Locations;
