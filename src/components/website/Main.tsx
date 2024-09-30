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
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="main"
        id="main"
      >
        <Typography fontSize={20}>
          Title, Email, Telephone, Address, Google Map
        </Typography>
      </AccordionSummary>

      <Box borderBottom="1px solid #000" mb={2} />

      <AccordionDetails
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
        }}
      >
        <TextField
          id="title"
          label="Title"
          type="text"
          value={stateWebsite?.title}
          onChange={(e) => {
            setStateWebsite((prevState) => ({
              ...prevState,
              title: e.target.value,
            }));
          }}
          sx={sx}
        />

        <TextField
          id="email"
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
          id="telephone"
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
          id="address"
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
          id="googleMap"
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
