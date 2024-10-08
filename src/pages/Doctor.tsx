import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Stack, TextField, Typography } from "@mui/material";

import {
  useFindWebsite,
  useGetDoctor,
  useGetWebsites,
} from "../store/getData.ts";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { generateId } from "../services/utils.ts";
import { DEFAULT_DOCTOR } from "../services/constants.ts";
import { saveProjectsToFirestore } from "../store/updateProjects.ts";

import emptyImag from "../assets/empty-img.png";
import { IDoctor, Project } from "../types/websites.types.ts";

import Layout from "../components/Layout.tsx";
import Button from "../components/shared/Button.tsx";
import ModalDeleteConfirmDoctor from "../components/modals/ModalDeleteConfirmDoctor.tsx";

const Doctor = () => {
  const { id: uid } = generateId();
  const { id, idDoctor } = useParams();
  const navigate = useNavigate();

  const { storeDoctor } = useGetDoctor();
  const { websites } = useGetWebsites();
  const { stateWebsite } = useFindWebsite(websites, id!);

  const [doctor, setDoctor] = useState<IDoctor>(DEFAULT_DOCTOR);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (idDoctor) {
      setDoctor(storeDoctor);
    } else {
      setDoctor((prevState) => ({
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

      setDoctor((prevState) => ({
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
      if (!idDoctor) {
        await saveProjectsToFirestore({
          ...updateWebsites,
          [newKeyName]: {
            ...stateWebsite,
            doctors: [...stateWebsite.doctors, doctor],
          },
        });
      } else {
        await saveProjectsToFirestore({
          ...updateWebsites,
          [newKeyName]: {
            ...stateWebsite,
            doctors: [
              ...stateWebsite?.doctors.map((oldDoctor) => {
                if (oldDoctor.id === idDoctor) {
                  return doctor;
                } else {
                  return oldDoctor;
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
          {" / Doctor"}
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
            src={doctor?.image ? doctor?.image : emptyImag}
            alt={doctor?.title}
            sx={{
              width: "100%",
              maxWidth: 360,
              height: 270,
              objectFit: "cover",
            }}
          />

          <Stack direction="column" gap={3.4} width="100%">
            <Button
              value={doctor?.image ? "Update photo" : "Add photo"}
              color="info"
              onClick={() =>
                document.getElementById(`file-input-${doctor.id}`)?.click()
              }
              sx={{
                height: 56,
                width: 200,
              }}
            />

            <input
              id={`file-input-${doctor.id}`}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e)}
            />

            <Stack direction="row" gap={3}>
              <TextField
                id="First name"
                label="First Name"
                type="text"
                value={doctor?.firstName}
                onChange={(e) => {
                  setDoctor((prevState) => ({
                    ...prevState,
                    firstName: e.target.value,
                  }));
                }}
                sx={{ backgroundColor: "#fff", width: 170 }}
              />

              <TextField
                id="Last name"
                label="Last Name"
                type="text"
                value={doctor?.lastName}
                onChange={(e) => {
                  setDoctor((prevState) => ({
                    ...prevState,
                    lastName: e.target.value,
                  }));
                }}
                sx={{ backgroundColor: "#fff", width: 250 }}
              />

              <TextField
                id="Age"
                label="Age"
                type="number"
                value={doctor?.age}
                onChange={(e) => {
                  setDoctor((prevState) => ({
                    ...prevState,
                    age: Number(e.target.value),
                  }));
                }}
                onFocus={(e) => e.target.select()}
                sx={{ backgroundColor: "#fff", width: 100 }}
              />

              <TextField
                id="Link"
                label="Social media (link)"
                type="text"
                value={doctor?.link}
                onChange={(e) => {
                  setDoctor((prevState) => ({
                    ...prevState,
                    link: e.target.value,
                  }));
                }}
                sx={{ backgroundColor: "#fff", width: "100%", maxWidth: 450 }}
              />
            </Stack>

            <TextField
              id="Title"
              label="Title"
              type="text"
              value={doctor?.title}
              multiline
              rows={3}
              onChange={(e) => {
                setDoctor((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }));
              }}
              sx={{ backgroundColor: "#fff", width: "100%", height: 100 }}
            />
          </Stack>
        </Stack>

        <TextField
          id="Text"
          label="Text"
          type="text"
          value={doctor?.text}
          multiline
          rows={3}
          onChange={(e) => {
            setDoctor((prevState) => ({
              ...prevState,
              text: e.target.value,
            }));
          }}
          sx={{ backgroundColor: "#fff", width: "100%", height: 100 }}
        />
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

        {idDoctor && (
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

      <ModalDeleteConfirmDoctor
        stateWebsite={stateWebsite}
        open={open}
        setOpen={setOpen}
        websites={websites}
      />
    </Layout>
  );
};

export default Doctor;
