import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Project, Website } from "../types/websites.types.ts";

import { ROLES } from "../services/constants.ts";
import { getCurrentUser, useGetWebsites } from "../store/getData.ts";

import Card from "../components/Card.tsx";
import Layout from "../components/Layout.tsx";
import Button from "../components/shared/Button.tsx";

const Home = () => {
  const navigate = useNavigate();
  const { websites } = useGetWebsites();
  const user = getCurrentUser();

  const handleCreateWebsite = () => {
    navigate("/website");
  };

  return (
    <Layout>
      <Typography
        variant="h5"
        fontWeight={600}
        color="rgb(55 152 210 / 98%)"
        sx={{ mb: 2 }}
        textAlign="center"
      >
        Clinics
      </Typography>

      <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={5}>
        {Object.entries(websites)
          .sort(([keyA]: [string, Project], [keyB]: [string, Project]) =>
            keyA.localeCompare(keyB),
          )
          .map(([, project]: [string, Project]) =>
            Object.entries(project)
              .sort(([keyA]: [string, Website], [keyB]: [string, Website]) =>
                keyA.localeCompare(keyB),
              )
              .map(([key, website]: [string, Website]) => (
                <Card key={key} website={website} />
              )),
          )}
      </Stack>

      {(user?.name === ROLES.DEVELOPER || user?.name === ROLES.SUPER_ADMIN) && (
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
      )}
    </Layout>
  );
};

export default Home;
