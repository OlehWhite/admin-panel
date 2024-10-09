import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import {
  useFindWebsite,
  useGetLocation,
  useGetWebsites,
} from "../store/getData.ts";
import { generateId } from "../services/utils.ts";
import { saveProjectsToFirestore } from "../store/updateProjects.ts";

import openImage from "../assets/location-open.png";
import openingSoonImage from "../assets/location-opening-soon.png";
import { DEFAULT_LOCATION } from "../services/constants.ts";
import { ILocation, Project } from "../types/websites.types.ts";

import Layout from "../components/Layout.tsx";
import Button from "../components/shared/Button.tsx";
import ModalDeleteConfirmLocation from "../components/modals/ModalDeleteConfirmLocation.tsx";

const Location = () => {
  const { id: uid } = generateId();
  const { id, idLocation } = useParams();
  const navigate = useNavigate();

  const { websites } = useGetWebsites();
  const { stateWebsite } = useFindWebsite(websites, id!);
  const { storeLocation } = useGetLocation();

  const [location, setLocation] = useState<ILocation>(DEFAULT_LOCATION);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (idLocation) {
      setLocation(storeLocation);
    } else {
      setLocation((prevState) => ({
        ...prevState,
        id: uid,
      }));
    }
  }, []);

  const handleSave = async () => {
    const arrayWebsites = Object.entries(websites).map(([_, project]) =>
      Object.entries(project).map(([, website]) => website),
    );

    const flatWebsites = arrayWebsites.flat();

    const updateWebsites: Project = flatWebsites.reduce((acc, website) => {
      if (website.id === id) {
        acc[website.keyName] = {
          ...stateWebsite,
        };
      } else {
        acc[website.keyName] = {
          ...website,
        };
      }
      return acc;
    }, {} as Project);

    const newKeyName = stateWebsite.keyName;

    try {
      if (!idLocation) {
        await saveProjectsToFirestore({
          ...updateWebsites,
          [newKeyName]: {
            ...stateWebsite,
            locations: [...stateWebsite.locations, location],
          },
        });
      } else {
        await saveProjectsToFirestore({
          ...updateWebsites,
          [newKeyName]: {
            ...stateWebsite,
            locations: [
              ...stateWebsite?.locations.map((oldLocation) => {
                if (oldLocation.id === idLocation) {
                  return location;
                } else {
                  return oldLocation;
                }
              }),
            ],
          },
        });
      }

      navigate(`/website/${id}`);
    } catch (error) {
      console.error("Error request: ", error);
    }
  };

  const handleOpenModal = () => setOpen(true);

  return (
    <Layout>
      <Typography
        variant="h5"
        fontWeight={600}
        color="rgb(55 152 210 / 98%)"
        sx={{ mb: 2 }}
        textAlign="center"
      >
        {stateWebsite.title || "Loading..."}
        <Box component="span" sx={{ color: "#000" }}>
          {" / Location"}
        </Box>
      </Typography>

      <Stack
        boxShadow="0px 0px 13px 0px #000000a8"
        borderRadius={2}
        overflow="hidden"
        p={3}
      >
        <Stack direction="row" alignItems="flex-start" gap={3}>
          <Stack width="100%" maxWidth={500} gap={3}>
            <Box
              component="img"
              src={location.open ? openImage : openingSoonImage}
              alt={location?.title}
              sx={{
                width: "100%",
                maxWidth: 500,
                objectFit: "cover",
              }}
            />

            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              border="1px solid #000"
              borderRadius="5px"
              height={56}
              bgcolor="#fff"
              px={2}
            >
              <Typography
                fontSize={16.5}
                sx={{
                  mr: 3.5,
                }}
              >
                Opening soon
              </Typography>

              <FormControlLabel
                checked={location.open}
                onChange={() =>
                  setLocation((prevState) => ({
                    ...prevState,
                    open: !prevState.open,
                  }))
                }
                sx={{
                  transform: "scale(1.4)",
                }}
                control={<Switch checked={location.open} />}
                label=""
              />

              <Typography fontSize={16.5}>Open</Typography>
            </Stack>
          </Stack>

          <Stack direction="column" gap={3.4} width="100%">
            <TextField
              label="Title"
              type="text"
              value={location?.title}
              onChange={(e) => {
                setLocation((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }));
              }}
              sx={{ backgroundColor: "#fff" }}
            />

            <TextField
              label="Address"
              type="text"
              value={location?.address}
              onChange={(e) => {
                setLocation((prevState) => ({
                  ...prevState,
                  address: e.target.value,
                }));
              }}
              sx={{ backgroundColor: "#fff" }}
            />

            <TextField
              label="Email"
              type="email"
              value={location?.email}
              onChange={(e) => {
                setLocation((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }));
              }}
              sx={{ backgroundColor: "#fff" }}
            />

            <TextField
              label="Telephone"
              type="tel"
              value={location?.tel}
              onChange={(e) => {
                setLocation((prevState) => ({
                  ...prevState,
                  tel: e.target.value,
                }));
              }}
              sx={{ backgroundColor: "#fff" }}
            />

            <TextField
              label="link"
              type="url"
              value={location?.link}
              onChange={(e) => {
                setLocation((prevState) => ({
                  ...prevState,
                  link: e.target.value,
                }));
              }}
              sx={{ backgroundColor: "#fff" }}
            />

            <TextField
              label="Google map"
              type="text"
              value={location?.googleMap}
              onChange={(e) => {
                setLocation((prevState) => ({
                  ...prevState,
                  googleMap: e.target.value,
                }));
              }}
              sx={{ backgroundColor: "#fff" }}
            />
          </Stack>
        </Stack>
      </Stack>

      <Stack mt={4} direction="row" width="100%" justifyContent="space-between">
        <Button
          value="Save"
          onClick={handleSave}
          sx={{
            width: "100%",
            maxWidth: 300,
            height: 56,
          }}
        />

        {idLocation && (
          <Button
            value="Delete this location"
            onClick={handleOpenModal}
            color="error"
            variant="outlined"
            sx={{
              width: "100%",
              maxWidth: 300,
              height: 56,
            }}
          />
        )}
      </Stack>

      <ModalDeleteConfirmLocation
        stateWebsite={stateWebsite}
        open={open}
        setOpen={setOpen}
        websites={websites}
      />
    </Layout>
  );
};

export default Location;
