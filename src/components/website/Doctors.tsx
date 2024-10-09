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
import emptyImag from "../../assets/empty-img.png";

import { IDoctor, IWebsiteState } from "../../types/websites.types.ts";

import Button from "../shared/Button.tsx";

const Doctors = ({ stateWebsite }: IWebsiteState) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleAddNewDoctor = () => {
    try {
      navigate(`/website/${id}/doctors`);
    } catch (error) {
      console.error("Can`t to create a new doctor:", error);
    }
  };

  const handleOpenDoctor = (doctor: IDoctor, idDoctor: string) => {
    try {
      if (doctor) {
        localStorage.setItem("doctor", JSON.stringify(doctor));
      }
      navigate(`/website/${id}/doctors/${idDoctor}`);
    } catch (error) {
      console.error("Can`t to open the doctor:", error);
    }
  };

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

      <AccordionDetails>
        <Stack direction="row" justifyContent="center">
          <Button
            value="Add new doctor"
            onClick={handleAddNewDoctor}
            sx={{
              width: "100%",
              maxWidth: 300,
              height: 56,
              mb: 3,
            }}
          />
        </Stack>

        <Stack flexWrap="wrap" width="100%" gap={3.6}>
          {stateWebsite?.doctors
            .map((doctor) => (
              <Stack
                key={doctor.id}
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
                onClick={() => handleOpenDoctor(doctor, doctor.id)}
              >
                <Stack
                  component="img"
                  src={doctor.image ? doctor.image : emptyImag}
                  sx={{
                    width: 220,
                    height: 150,
                    objectFit: "cover",
                  }}
                />

                <Stack gap={1} justifyContent="center">
                  <Typography color="#3498db" fontSize={20}>
                    {doctor.firstName} {doctor.lastName}
                  </Typography>

                  <Typography fontWeight={300} fontStyle="italic">
                    Age: {doctor.age}
                  </Typography>

                  <Typography fontWeight={400}>
                    {doctor.title.length > 150
                      ? doctor.title.slice(0, 150) + "..."
                      : doctor.title}
                  </Typography>

                  <Typography fontWeight={300} fontStyle="italic">
                    {doctor.text.length > 150
                      ? doctor.text.slice(0, 150) + "..."
                      : doctor.text}
                  </Typography>
                </Stack>
              </Stack>
            ))
            .reverse()}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default Doctors;
