import { Stack } from "@mui/material";

import { WebsitesCollection } from "../types/websites.types.ts";
import { BREADCRUMBS_HOME } from "../services/constants.ts";
import { useGetWebsites } from "../store/getData.ts";

import Card from "../components/Card.tsx";
import Layout from "../components/Layout.tsx";

const Home = () => {
  const { websites }: { websites: WebsitesCollection } = useGetWebsites();

  return (
    <Layout breadcrumbs={BREADCRUMBS_HOME}>
      <Stack direction="row" flexWrap="wrap" gap={5}>
        {Object.entries(websites).map(([_, project]) =>
          Object.entries(project).map(([key, website]) => (
            <Card key={key} website={website} />
          )),
        )}
      </Stack>
    </Layout>
  );
};

export default Home;
