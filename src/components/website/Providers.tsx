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

import { IProvider, IWebsiteState } from "../../types/websites.types.ts";

import Button from "../shared/Button.tsx";

const Providers = ({ stateWebsite }: IWebsiteState) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleAddNewProvider = () => {
    try {
      navigate(`/website/${id}/providers`);
    } catch (error) {
      console.error("Can`t to create a new provider:", error);
    }
  };

  const handleOpenProvider = (provider: IProvider, idProvider: string) => {
    try {
      if (provider) {
        localStorage.setItem("provider", JSON.stringify(provider));
      }
      navigate(`/website/${id}/providers/${idProvider}`);
    } catch (error) {
      console.error("Can`t to open the provider:", error);
    }
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="providers"
        id="providers"
      >
        <Typography fontSize={20}>
          Providers
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
            value="Add new provider"
            onClick={handleAddNewProvider}
            sx={{
              width: "100%",
              maxWidth: 300,
              height: 56,
              mb: 3,
            }}
          />
        </Stack>

        <Stack flexWrap="wrap" width="100%" gap={3.6}>
          {stateWebsite?.providers
            .map((provider) => (
              <Stack
                key={provider.id}
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
                onClick={() => handleOpenProvider(provider, provider.id)}
              >
                <Stack
                  component="img"
                  src={provider.image ? provider.image : emptyImag}
                  sx={{
                    width: 220,
                    height: 150,
                    objectFit: "cover",
                  }}
                />

                <Stack gap={1} justifyContent="center">
                  <Typography color="#3498db" fontSize={20}>
                    {provider.firstName} {provider.lastName}
                  </Typography>

                  <Typography fontWeight={300} fontStyle="italic">
                    Age: {provider.age}
                  </Typography>

                  <Typography fontWeight={400}>
                    {provider.title.length > 150
                      ? provider.title.slice(0, 150) + "..."
                      : provider.title}
                  </Typography>

                  <Typography fontWeight={300} fontStyle="italic">
                    {provider.text.length > 150
                      ? provider.text.slice(0, 150) + "..."
                      : provider.text}
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

export default Providers;
