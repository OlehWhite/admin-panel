import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Stack, TextField, Typography } from "@mui/material";

import {
  useFindWebsite,
  useGetProvider,
  useGetWebsites,
} from "../store/getData.ts";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { generateId } from "../services/utils.ts";
import { DEFAULT_PROVIDER } from "../services/constants.ts";
import { saveProjectsToFirestore } from "../store/updateProjects.ts";

import emptyImag from "../assets/empty-img.png";
import { IProvider, Project } from "../types/websites.types.ts";

import Layout from "../components/Layout.tsx";
import Button from "../components/shared/Button.tsx";
import ModalDeleteConfirmProvider from "../components/modals/ModalDeleteConfirmProvider.tsx";
import TextEditor from "../components/website/blogs/TextEditor.tsx";

const Provider = () => {
  const { id: uid } = generateId();
  const { id, idProvider } = useParams();
  const navigate = useNavigate();

  const { storeProvider } = useGetProvider();
  const { websites } = useGetWebsites();
  const { stateWebsite } = useFindWebsite(websites, id!);

  const [provider, setProvider] = useState<IProvider>(DEFAULT_PROVIDER);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (idProvider) {
      setProvider(storeProvider);
    } else {
      setProvider((prevState) => ({
        ...prevState,
        id: uid,
      }));
    }
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      uploadImageToFirebase(file);
    }
  };

  const uploadImageToFirebase = async (file: File) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);

    try {
      await uploadBytes(storageRef, file);

      const url = await getDownloadURL(storageRef);

      setProvider((prevState) => ({
        ...prevState,
        image: url,
      }));
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

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
      if (!idProvider) {
        await saveProjectsToFirestore({
          ...updateWebsites,
          [newKeyName]: {
            ...stateWebsite,
            providers: [...stateWebsite.providers, provider],
          },
        });
      } else {
        await saveProjectsToFirestore({
          ...updateWebsites,
          [newKeyName]: {
            ...stateWebsite,
            providers: [
              ...stateWebsite?.providers.map((oldProvider) => {
                if (oldProvider.id === idProvider) {
                  return provider;
                } else {
                  return oldProvider;
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
          {" / Provider"}
        </Box>
      </Typography>

      <Stack
        boxShadow="0px 0px 13px 0px #000000a8"
        borderRadius={2}
        overflow="hidden"
        p={3}
        gap={3}
      >
        <Stack direction="row" alignItems="center" gap={3}>
          <Box
            component="img"
            src={provider?.image ? provider?.image : emptyImag}
            alt={provider?.title}
            sx={{
              width: "100%",
              maxWidth: 360,
              height: 270,
              objectFit: "cover",
            }}
          />

          <Stack direction="column" gap={3.4} width="100%">
            <Button
              value={provider?.image ? "Update photo" : "Add photo"}
              color="info"
              onClick={() =>
                document.getElementById(`file-input-${provider.id}`)?.click()
              }
              sx={{
                height: 56,
                width: 200,
              }}
            />

            <input
              id={`file-input-${provider.id}`}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e)}
            />

            <Stack direction="row" gap={3}>
              <TextField
                label="First Name"
                type="text"
                value={provider?.firstName}
                onChange={(e) => {
                  setProvider((prevState) => ({
                    ...prevState,
                    firstName: e.target.value,
                  }));
                }}
                sx={{ backgroundColor: "#fff", width: 170 }}
              />

              <TextField
                label="Last Name"
                type="text"
                value={provider?.lastName}
                onChange={(e) => {
                  setProvider((prevState) => ({
                    ...prevState,
                    lastName: e.target.value,
                  }));
                }}
                sx={{ backgroundColor: "#fff", width: 250 }}
              />

              <TextField
                label="Age"
                type="number"
                value={provider?.age}
                onChange={(e) => {
                  setProvider((prevState) => ({
                    ...prevState,
                    age: Number(e.target.value),
                  }));
                }}
                onFocus={(e) => e.target.select()}
                sx={{ backgroundColor: "#fff", width: 100 }}
              />

              <TextField
                label="Social media (link)"
                type="text"
                value={provider?.link}
                onChange={(e) => {
                  setProvider((prevState) => ({
                    ...prevState,
                    link: e.target.value,
                  }));
                }}
                sx={{ backgroundColor: "#fff", width: "100%", maxWidth: 450 }}
              />
            </Stack>

            <TextField
              label="Title"
              type="text"
              value={provider?.title}
              multiline
              rows={3}
              onChange={(e) => {
                setProvider((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }));
              }}
              sx={{ backgroundColor: "#fff", width: "100%", height: 100 }}
            />
          </Stack>
        </Stack>

        <Stack gap={3} mt={3}>
          <TextEditor state={provider} setState={setProvider} />
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

        {idProvider && (
          <Button
            value="Delete this blog"
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

      <ModalDeleteConfirmProvider
        stateWebsite={stateWebsite}
        open={open}
        setOpen={setOpen}
        websites={websites}
      />
    </Layout>
  );
};

export default Provider;
