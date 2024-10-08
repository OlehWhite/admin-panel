import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IWebsiteState } from "../../types/websites.types.ts";

const Doctors = ({ stateWebsite, setStateWebsite }: IWebsiteState) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="doctors"
        id="doctors"
      >
        <Typography fontSize={20}>
          Doctors
          <Box component="span" fontSize={16} fontWeight={200}>
            {" "}
            ( Image, Link, First Name, Last Name, Age, Title, Text )
          </Box>
        </Typography>
      </AccordionSummary>

      <Box borderBottom="1px solid #BEBEBE" mb={2} />

      <AccordionDetails></AccordionDetails>
    </Accordion>
  );
};

export default Doctors;
