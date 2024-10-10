import { CircularProgress, Stack } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Stack alignItems="center">
      <CircularProgress color="primary" size={60} />
    </Stack>
  );
};

export default Loader;
