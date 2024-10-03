import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IWebsiteState } from "../../types/websites.types.ts";

const Locations = ({ stateWebsite, setStateWebsite }: IWebsiteState) => {
  console.log(stateWebsite, setStateWebsite);

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
            ( Image, Title, Text, Telephone, Email, Link, Address, Google map )
          </Box>
        </Typography>
      </AccordionSummary>

      <Box borderBottom="1px solid #BEBEBE" mb={2} />

      <AccordionDetails></AccordionDetails>
    </Accordion>
  );
};

export default Locations;
