import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IWebsiteState } from "../../types/websites.types.ts";

const Schedule = ({ stateWebsite, setStateWebsite }: IWebsiteState) => {
  const handleChange = (day: string, field: string, value: string) => {
    setStateWebsite((prevState) => ({
      ...prevState,
      schedule: prevState.schedule.map((item) =>
        item.day === day ? { ...item, [field]: value } : item,
      ),
    }));
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="schedule"
        id="schedule"
      >
        <Typography fontSize={20}>
          Schedule{" "}
          <Box component="span" fontSize={16} fontWeight={200}>
            {" "}
            ( Day, Open time, Close time )
          </Box>
        </Typography>
      </AccordionSummary>

      <Box borderBottom="1px solid #BEBEBE" mb={2} />

      <AccordionDetails>
        <Stack gap={3}>
          {stateWebsite?.schedule?.map(({ day, open, close }) => (
            <Stack key={day} direction="row" gap={2} alignItems="center">
              <Typography fontSize={18} width="100%" maxWidth={100}>
                {day}
              </Typography>
              <Box>{" - "}</Box>
              <TextField
                id={day}
                label="Open"
                type="text"
                value={open}
                onChange={(e) => handleChange(day, "open", e.target.value)}
                sx={{ width: 90 }}
              />
              -
              <TextField
                id={day}
                label="Close"
                type="text"
                value={close}
                onChange={(e) => handleChange(day, "close", e.target.value)}
                sx={{ width: 90 }}
              />
            </Stack>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default Schedule;
