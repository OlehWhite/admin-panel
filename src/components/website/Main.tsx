import { ChangeEvent } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IWebsiteState } from "../../types/websites.types.ts";

const sx = {
  width: "100%",
  maxWidth: 400,
};

const Main = ({ stateWebsite, setStateWebsite }: IWebsiteState) => {
  const formatString = (str: string) => {
    return str.replace(/\s+/g, "_").toUpperCase();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setStateWebsite((prevState) => ({
      ...prevState,
      title: e.target.value,
      keyName: formatString(e.target.value),
    }));
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="main"
        id="main"
      >
        <Typography fontSize={20}>
          Main
          <Box component="span" fontSize={16} fontWeight={200}>
            {" "}
            ( Title, Email, Telephone, Address, Google Map )
          </Box>
        </Typography>
      </AccordionSummary>

      <Box borderBottom="1px solid #BEBEBE" mb={2} />

      <AccordionDetails
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
        }}
      >
        <TextField
          label="Title"
          type="text"
          value={stateWebsite?.title}
          onChange={handleChange}
          sx={sx}
        />

        <TextField
          label="Email"
          type="email"
          value={stateWebsite.email}
          onChange={(e) => {
            setStateWebsite((prevState) => ({
              ...prevState,
              email: e.target.value,
            }));
          }}
          sx={sx}
        />

        <TextField
          label="Telephone"
          type="tel"
          value={stateWebsite.tel}
          onChange={(e) => {
            setStateWebsite((prevState) => ({
              ...prevState,
              tel: e.target.value,
            }));
          }}
          sx={sx}
        />

        <TextField
          label="Address"
          type="text"
          value={stateWebsite.address}
          onChange={(e) => {
            setStateWebsite((prevState) => ({
              ...prevState,
              address: e.target.value,
            }));
          }}
          sx={sx}
        />

        <TextField
          label="GoogleMap"
          type="text"
          value={stateWebsite.googleMaps}
          onChange={(e) => {
            setStateWebsite((prevState) => ({
              ...prevState,
              googleMaps: e.target.value,
            }));
          }}
          sx={sx}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default Main;
