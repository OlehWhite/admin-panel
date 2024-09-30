import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { WebsitesCollection } from "../types/websites.types.ts";
import { BREADCRUMBS_WEBSITE, test } from "../services/constants.ts";
import { useGetWebsites } from "../store/getData.ts";

import Layout from "../components/Layout.tsx";
import { useEffect, useState } from "react";
import Main from "../components/website/Main.tsx";
import Button from "../components/shared/Button.tsx";
import Loader from "../components/Loader.tsx";
import Schedule from "../components/website/Schedule.tsx";
import { saveProjectsToFirestore } from "../store/updateProjects.ts";

const WebSite = () => {
  const { id } = useParams();
  const { websites }: { websites: WebsitesCollection } = useGetWebsites();

  const [stateWebsite, setStateWebsite] = useState<any>({});
  console.log(stateWebsite);
  useEffect(() => {
    if (websites) {
      const website = Object.entries(websites).reduce((acc, [_, project]) => {
        const foundWebsite = Object.entries(project).find(
          ([_, website]) => website.id === id,
        );
        return foundWebsite ? foundWebsite[1] : acc;
      }, null);

      setStateWebsite(website);
    }
  }, [websites]);

  if (!stateWebsite) {
    return <Loader />;
  }

  // const keyToUpdate = stateWebsite.keyName; // Отримуємо ключ з stateWebsite

  const handleSave = async () => {
    console.log("Save");
    // const id = Object.entries(websites)[0][0];
    //
    // const updatedWebsites = {
    //   id:
    // };
    //
    // console.log(updatedWebsites);

    await saveProjectsToFirestore(test); // зберігати websites + stateWebsite
  };

  return (
    <Layout breadcrumbs={BREADCRUMBS_WEBSITE}>
      <Stack gap={1}>
        <Main stateWebsite={stateWebsite} setStateWebsite={setStateWebsite} />

        <Schedule
          stateWebsite={stateWebsite}
          setStateWebsite={setStateWebsite}
        />

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Accordion 2</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Button
          value="Save"
          onClick={handleSave}
          sx={{
            width: "100%",
            maxWidth: 300,
            height: 56,
            marginTop: 3,
          }}
        />
      </Stack>
    </Layout>
  );
};

export default WebSite;
