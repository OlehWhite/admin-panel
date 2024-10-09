import { ChangeEvent } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IWebsiteState } from "../../types/websites.types.ts";

const SocialsMedia = ({ stateWebsite, setStateWebsite }: IWebsiteState) => {
  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number,
  ) => {
    const newLinks = [...stateWebsite.links];

    newLinks[index] = {
      ...newLinks[index],
      link: e.target.value,
    };

    setStateWebsite((prevState) => ({
      ...prevState,
      links: newLinks,
    }));
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="social-media"
        id="social-media"
      >
        <Typography fontSize={20}>
          Social media
          <Box component="span" fontSize={16} fontWeight={200}>
            {" "}
            ( Link, Title )
          </Box>
        </Typography>
      </AccordionSummary>

      <Box borderBottom="1px solid #BEBEBE" mb={2} />

      <AccordionDetails>
        <Stack direction="column" gap={3}>
          {stateWebsite.links.map((linkObj, index) => (
            <TextField
              key={linkObj.title}
              label={linkObj.title}
              type="text"
              value={linkObj.link}
              onChange={(e) => handleChange(e, index)}
              sx={{
                width: "100%",
                maxWidth: 600,
              }}
            />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default SocialsMedia;
