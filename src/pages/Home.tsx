import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useGetWebsites } from "../store/getData.ts";

import Card from "../components/Card.tsx";
import Layout from "../components/Layout.tsx";
import Button from "../components/shared/Button.tsx";

const Home = () => {
  const navigate = useNavigate();
  const { websites } = useGetWebsites();

  const handleCreateWebsite = () => {
    navigate("/website");
  };

  return (
    <Layout>
      <Stack direction="row" flexWrap="wrap" gap={5}>
        {Object.entries(websites).map(([_, project]) =>
          Object.entries(project).map(([key, website]) => (
            <Card key={key} website={website} />
          )),
        )}
      </Stack>

      <Stack mt={4} direction="row" width="100%" justifyContent="center">
        <Button
          value="Add new Website"
          onClick={handleCreateWebsite}
          sx={{
            width: "100%",
            maxWidth: 300,
            height: 56,
          }}
        />
      </Stack>
    </Layout>
  );
};

export default Home;
