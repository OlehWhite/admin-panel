import { CircularProgress, Stack } from "@mui/material";
import Layout from "./Layout.tsx";

const Loader = () => {
  return (
    <Layout>
      <Stack alignItems="center">
        <CircularProgress color="primary" size={60} />
      </Stack>
    </Layout>
  );
};

export default Loader;
