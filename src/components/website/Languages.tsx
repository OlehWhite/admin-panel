import { ChangeEvent } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  FormControlLabel,
  Checkbox,
  Typography,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IWebsiteState } from "../../types/websites.types.ts";

const Languages = ({ stateWebsite, setStateWebsite }: IWebsiteState) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setStateWebsite((prevState) => {
      const currentLanguages = prevState.languages || [];

      if (checked) {
        return {
          ...prevState,
          languages: [...currentLanguages, value],
        };
      } else {
        return {
          ...prevState,
          languages: currentLanguages.filter((lang) => lang !== value),
        };
      }
    });
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="main"
        id="main"
      >
        <Typography fontSize={20}>Languages</Typography>
      </AccordionSummary>

      <Box borderBottom="1px solid #BEBEBE" mb={2} />

      <AccordionDetails
        sx={{
          display: "flex",

          flexWrap: "wrap",
          gap: 4,
        }}
      >
        <FormControl>
          <Stack direction="row" gap={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={stateWebsite.languages?.includes("en")}
                  value="en"
                  onChange={handleChange}
                />
              }
              label="English"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={stateWebsite.languages?.includes("fr")}
                  value="fr"
                  onChange={handleChange}
                />
              }
              label="French"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={stateWebsite.languages?.includes("es")}
                  value="es"
                  onChange={handleChange}
                />
              }
              label="Spanish"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={stateWebsite.languages?.includes("ar")}
                  value="ar"
                  onChange={handleChange}
                />
              }
              label="Arabic"
            />
          </Stack>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
};

export default Languages;
