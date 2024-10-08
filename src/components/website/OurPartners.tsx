import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IWebsiteState } from "../../types/websites.types.ts";

const OurPartners = ({ stateWebsite, setStateWebsite }: IWebsiteState) => {
  // console.log(stateWebsite, setStateWebsite);
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="our-partners"
        id="our-partners"
      >
        <Typography fontSize={20}>
          Our partners{" "}
          <Box component="span" fontSize={16} fontWeight={200}>
            {" "}
            ( Image, Link )
          </Box>
        </Typography>
      </AccordionSummary>

      <Box borderBottom="1px solid #BEBEBE" mb={2} />

      <AccordionDetails></AccordionDetails>
    </Accordion>
  );
};

export default OurPartners;
